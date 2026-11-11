import test from 'node:test';
import assert from 'node:assert/strict';
import {defaultAISetup,normalizeAISetup,validateAISetup,activitySnapshot,activityOverrideError,defaultTrial,trialStatus,spendCredits,grantAllowance,requestAccess,approveAccess} from '../src/aiSetupState.js';

test('activity snapshots preserve previous prompts/personas and defaults after course edits',()=>{
 const setup=defaultAISetup(),snapshot=activitySnapshot(setup);
 setup.revision++;setup.personas[0].name='New tutor';setup.prompts[0].instructions='New instructions';setup.maxTurns=6;
 assert.equal(snapshot.persona.name,'Socratic Tutor');assert.notEqual(snapshot.prompt.instructions,'New instructions');assert.equal(snapshot.maxTurns,12);assert.equal(snapshot.revision,1);
 assert.equal(activitySnapshot(setup).maxTurns,6);
 assert.equal(activityOverrideError(snapshot,structuredClone(snapshot),setup),'');
});

test('permitted activity changes stay within the course maximum; locked changes are rejected',()=>{
 const policy=defaultAISetup(),baseline=activitySnapshot(policy);
 assert.equal(activityOverrideError({...baseline,maxTurns:8},baseline,policy),'');
 assert.match(activityOverrideError({...baseline,maxTurns:13},baseline,policy),/course maximum/);
 assert.match(activityOverrideError({...baseline,maxTurns:1.5},baseline,policy),/whole number/);
 policy.permissions.language=false;
 assert.match(activityOverrideError({...baseline,language:'Spanish'},baseline,policy),/doesn’t permit/);
 assert.equal(activityOverrideError(baseline,baseline,policy),'');
 assert.match(activityOverrideError({...baseline,language:''},baseline,policy),/language/);
});

test('one instructor allowance is consumed across courses and cannot be overspent',()=>{
 let trial={...defaultTrial(),limit:6};
 const first=spendCredits(trial,{label:'Document',course:'Course A',credits:5,id:'first'},'2026-11-11');assert.equal(first.ok,true);trial=first.trial;
 const failed=spendCredits(trial,{label:'Another document',course:'Course B',credits:5},'2026-11-11');assert.equal(failed.ok,false);assert.equal(failed.trial.entries.length,1);
 trial=spendCredits(trial,{label:'Suggestion',course:'Course B',credits:1,id:'second'},'2026-11-11').trial;
 assert.deepEqual(trial.entries.map(entry=>entry.course),['Course A','Course B']);assert.equal(trialStatus(trial,'2026-11-11').remaining,0);
 assert.equal(spendCredits(trial,{label:'Blocked',course:'Course A'},'2026-11-11').ok,false);
 assert.equal(first.trial.entries.length,1);
});

test('expired and insufficient trials preserve their ledger and reject new AI use',()=>{
 const trial={...defaultTrial(),limit:10,expiresOn:'2026-11-10'};
 assert.equal(trialStatus(trial,'2026-11-11').expired,true);
 assert.equal(spendCredits(trial,{label:'Expired',course:'Course A'},'2026-11-11').ok,false);
 assert.deepEqual(trial.entries,[]);
 assert.equal(spendCredits({...trial,expiresOn:''},{label:'Invalid',course:'Course A',credits:-1},'2026-11-11').ok,false);
 assert.equal(trialStatus({...trial,expiresOn:'2026-11-11'},'2026-11-11').available,true);
});

test('access requests need explicit admin approval and cannot be credited twice',()=>{
 const empty={...defaultTrial(),limit:0};const request=requestAccess(empty,500,'Try the course tools');assert.equal(request.ok,true);
 assert.equal(trialStatus(request.trial).available,false);
 assert.equal(requestAccess(request.trial,500).ok,false);
 const approved=approveAccess(request.trial,request.trial.requests[0].id);
 assert.equal(approved.limit,500);assert.equal(approved.requests[0].status,'Approved');assert.equal(trialStatus(approved).available,true);
 assert.equal(approveAccess(approved,request.trial.requests[0].id).limit,500);
 assert.deepEqual(approved.entries,[]);
});

test('admin grants preserve usage; course config validates positive whole-number limits',()=>{
 let trial=spendCredits(defaultTrial(),{label:'Test',course:'Course A',credits:5}).trial;
 assert.equal(grantAllowance(trial,4).ok,false);assert.equal(grantAllowance(trial,5).ok,true);
 assert.equal(grantAllowance(trial,10,'2026-02-30').ok,false);
 trial=grantAllowance(trial,100,'2026-12-01').trial;assert.equal(trial.entries.length,1);assert.equal(trial.limit,100);
 const setup=defaultAISetup();assert.equal(validateAISetup(setup),'');setup.maxTurns=0;assert.match(validateAISetup(setup),/Turn limit/);
 assert.equal(normalizeAISetup({permissions:{model:false}}).permissions.language,true);
});
