// const conn = require('../config/dbConnect');
// const util = require('util');
// const query = util.promisify(conn.query).bind(conn)


// const selectExecuter = async(tableName,conditionObj) =>{
    
//     let conditionArr  = [];
//     let conditionValueArr =  [];

//     for(condition in conditionObj){
//         conditionArr.push(condition)
//         conditionValueArr.push(conditionObj[condition])
//     }
//     let checkInData = await query(`select * from ${tableName} where ${conditionArr[0]} = "${conditionValueArr[0]}" `)
//     console.log("checkin data",checkInData)
// }

// obj = {
//     "fk_emp_id": "6"
// }

// selectExecuter("basic_info",obj)