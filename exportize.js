#!/usr/bin/env node
const e = require('shelljs').exec;
const _ = require('lodash');
const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));

const files = _.filter(argv._, (f)=>f.endsWith('.json')).map((f)=>({from: f, to: f.replace(/\.json$/,'.js')}));
_.each(files, (f)=>{
  e(`git mv ${f.from} ${f.to}`);
  fs.writeFileSync(f.to, `module.exports=` + fs.readFileSync(f.to));
  e(`npx eslint ${f.to} --fix`)
});
