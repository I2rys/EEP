//Dependencies
const Fs = require("fs")

//Variables
const Self_Args = process.argv.slice(2)

var accounts = []

//Main
if(!Self_Args.length){
    console.log("node index.js <input> <output>")
    process.exit()
}

if(!Fs.existsSync(Self_Args[0])){
    console.log("Unable to find the file.")
    process.exit()
}

if(!Self_Args[1]){
    console.log("Invalid output.")
    process.exit()
}

const file_data = Fs.readFileSync(Self_Args[0], "utf8")

if(!file_data.length){
    console.log("File data is empty.")
    process.exit()
}

console.log("Grabbing accounts.")
const accounts_found = file_data.match(/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.-]+:[a-zA-Z0-9._-]+/g)

if(!accounts_found){
    console.log("No accounts found.")
    process.exit()
}

console.log("Filtering accounts.")
for( i in accounts_found ){
    if(accounts.indexOf(accounts_found[i]) == -1){
        accounts.push(accounts_found[i])
    }
}

console.log(`Saving accounts to ${Self_Args[1]}.`)
Fs.writeFileSync(Self_Args[1], accounts.join("\n"), "utf8")
console.log(`Accounts successfully saved in ${Self_Args[1]}`)