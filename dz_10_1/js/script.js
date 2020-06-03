const person = { name: "Alex", surname: "Smith", phone: "+380 80 000 00 00" };

const helloTemplate = createTemplate("Hello, {{name}}!");
console.log(helloTemplate(person));

const detailsTemplate = createTemplate("{{name}} {{surname}}, phone {{phone}}");
console.log(detailsTemplate(person));

function createTemplate(templateString) {
  let argument = templateString;

  function templateFilling(givenObject) {
    Object.keys(givenObject).forEach((element) => {
      argument = argument.replace(`{{${element}}}`, givenObject[element]);
    });
    return argument;
  }
  return templateFilling;
}
