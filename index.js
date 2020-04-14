const {prompt} = require('inquirer');
const fs = require('fs');
const axios = require('axios')
  const prompt1 = {message: "What is your github username?",
    name: "github", default: "MylesM18"};
    const prompt2 = [
        {message: "What was your project title?", name: 'title', default: 'project'},
        {message: "Please enter a short description of project?", name: 'description', default: 'food project'},
        {message: "What would you like in the table of contents?", name: 'table', type:'checkbox', 
        choices: ['Installation', 'Usage', 'License', 'Contributors', 'Test', 'Questions'],
        default: ['Installation', 'Usage', 'License', 'Contributors', 'Test', 'Questions']},
        {message: "What command is used to installation?", name: 'installation', default: 'npm install'},
        {message: "How will the app start?", name: 'usage', default: 'npm start'},
        {message: "What license would you like for your app?",type:'list',choices: ['MIT', 'GNU', 'Apache', 'None'],
        name: 'license', default: 'MIT'},
        {message: "Please list all your project contributors (please separate github usernames with a comma)", 
        name: 'contributors', default: 'MylesM18'},
        {message: "How will the user run tests?", name: 'test', default: 'npm run test'}
    ];

async function init(){
    const {github} = await prompt(prompt1);
    const {data} = await axios.get('https://api.github.com/users/'+github);
    console.log(data)
    const answers = await prompt(prompt2);
    console.log(answers);
    fs.writeFile('README.md' , createReadme({...data, ...answers, test: 'its working!'}), function(err){
        if(err) throw err;
        console.log('readme created!')
    });
}

function createReadme(data){
    console.log(data);
    let toc = '';
    data.table.forEach(item=> toc += `* [${item}](#${item})\n\n`);
    return `# ${data.title}

## Description
${data.description}

## Table of Contents
${toc}

## Installation
${data.installation}

## Usage
${data.usage}


## License
${data.license}


### Contributors
${data.contributors}

### Test
${data.test}
`
}

init()