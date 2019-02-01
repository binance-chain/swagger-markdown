const dataTypeTransformer = require('./dataTypes');
const Schema = require('../models/schema');

/**
 * If Property field is present parse them.
 * @param name of the definition
 * @param definition definition object
 */
const parseProperties = (name, definition) => {
  const res = [];
  Object.keys(definition.properties).map(propName => {
    const prop = definition.properties[propName];
    const typeCell = dataTypeTransformer(new Schema(prop));
    const descriptionCell = 'description' in prop ? prop.description : '';
    const exampleCell = 'example' in prop ? prop.example : '';
    res.push(`| ${propName} | ${typeCell} | ${descriptionCell} | ${exampleCell} |`);
  });
  return res;
};

/**
 * Parse allOf defintion
 * @param name of the definition
 * @param definition definition object
 */
const parsePrimitive = (name, definition) => {
  const res = [];
  const typeCell = 'type' in definition ? definition.type : '';
  const descriptionCell = 'description' in definition ? definition.description : '';
  const exampleCell = 'example' in definition ? definition.example : '';
  res.push(`| ${name} | ${typeCell} | ${descriptionCell} | ${exampleCell} |`);
  return res;
};

/**
 * @param {type} name
 * @param {type} definition
 * @return {type} Description
 */
const processDefinition = (name, definition) => {
  let res = [];
  let parsedDef = [];
  res.push('');
  res.push(`### ${name}  `);
  res.push('');
  if (definition.description) {
    res.push(definition.description);
    res.push('');
  }
  res.push('| Name | Type | Description | Example |');
  res.push('| ---- | ---- | ----------- | ------- |');

  if ('properties' in definition) {
    parsedDef = parseProperties(name, definition);
  } else {
    parsedDef = parsePrimitive(name, definition);
  }
  res = res.concat(parsedDef);

  return res.length ? res.join('\n') : null;
};
module.exports.processDefinition = processDefinition;

/**
 * @param {type} definitions
 * @return {type} Description
 */
module.exports = definitions => {
  const res = [];
  Object.keys(definitions).map(definitionName => res.push(processDefinition(
    definitionName,
    definitions[definitionName]
  )));
  if (res.length > 0) {
    res.unshift('---');
    res.unshift('### Models');
    return res.join('\n');
  }
  return null;
};
