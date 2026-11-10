import test from 'node:test';
import assert from 'node:assert/strict';
import {migrateModuleMap,hydrateMaterial,moduleName,groupMaterials,goalFor,placementSuggestions} from '../src/learning.js';
const courses=['Course A','Course B'];
const defaults=['Module 1 · Strategy','Module 2 · Customer research'];
const setup=()=>migrateModuleMap({},courses,defaults);

test('legacy module lists and material assignments retain identity through reordering and renaming',()=>{
 const map=migrateModuleMap({'Course A':[...defaults,'Module 3 · Finance']},courses,defaults);
 const item=hydrateMaterial({id:'reading',course:'Course A',title:'Customer interviews',content:'Interview customers to discover needs.',modules:[defaults[0],defaults[1]]},map);
 const reordered=[map['Course A'][1],{...map['Course A'][0],title:'Competitive position'},map['Course A'][2]];
 const migratedAgain=hydrateMaterial(item,{'Course A':reordered});
 assert.deepEqual(migratedAgain.moduleIds,item.moduleIds);
 assert.equal(moduleName(reordered,item.moduleIds[0]),'Module 2 · Competitive position');
 assert.equal(moduleName(reordered,item.moduleIds[1]),'Module 1 · Customer research');
 assert.equal(map['Course B'].length,2);
 assert.notEqual(map['Course A'][0].id,map['Course B'][0].id);
});

test('readable imports get an editable summary without inventing approved objectives',()=>{
 const i=hydrateMaterial({id:'x',course:'Course A',title:'Market survey',content:'Customer interviews help identify needs. Surveys can test assumptions.',module:defaults[1]},setup());
 assert.match(i.summary,/Customer interviews/);
 assert.equal(i.summaryStatus,'suggested');
 assert.deepEqual(i.learningGoals,[]);
 assert.match(goalFor(i),/customer research/i);
 const reviewed={...i,summary:'My summary',summaryStatus:'reviewed',learningGoals:['Compare survey methods.']};
 assert.deepEqual(hydrateMaterial(reviewed,setup()),reviewed);
});

test('unreadable binary uploads get no invented summary or goal',()=>{
 const i=hydrateMaterial({id:'pdf',course:'Course A',title:'customer-strategy',content:'Uploaded file: customer-strategy.pdf. Binary file preview is unavailable in this mockup.',module:'Unassigned'},setup());
 assert.equal(i.summary,'');assert.equal(i.summaryStatus,'needs-context');assert.equal(goalFor(i),'');
 assert.deepEqual(groupMaterials([i]),[]);
 assert.deepEqual(placementSuggestions([i],setup()['Course A']),[]);
});

test('suggested groups cite only the supplied readable sources and can separate subjects',()=>{
 const materials=[{id:'customers',title:'Customer survey',content:'Customer interviews and segmentation.'},{id:'teams',title:'Leading teams',content:'Team communication and organizational change.'}];
 const groups=groupMaterials(materials);
 assert.equal(groups.length,2);
 assert.deepEqual(new Set(groups.flatMap(g=>g.items.map(i=>i.id))),new Set(['customers','teams']));
});

test('placement recommendations are read-only, use module goals, and skip current matches',()=>{
 const records=setup()['Course A'];
 const i={id:'reading',title:'Customer research',content:'Customer interviews and segmentation identify a target market.',moduleIds:[]};
 const recommendations=placementSuggestions([i],records);
 assert.equal(recommendations.length,1);assert.equal(recommendations[0].target.id,records[1].id);
 assert.deepEqual(i.moduleIds,[]);
 assert.deepEqual(placementSuggestions([{...i,moduleIds:[records[1].id]}],records),[]);
});
