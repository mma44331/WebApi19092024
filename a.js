const bcrypt=require('bcrypt');
const pass="abc123";
const saltRounds=10;
bcrypt.hash(pass,saltRounds,(err,hashPass)=>{
if(err)
console.log(err.message);
else
console.log(hashPass);
});
hashFromDb="$2b$10$nCWtJkGEO4eJJuHvLW22HOeiPmNsYR1fJved4S1NSpqR1oEGkl66";
bcrypt.compare(pass,hashFromDb,(err,status)=>{
    if(err)
    console.log(err.message);
    else
    console.log(status);
    });