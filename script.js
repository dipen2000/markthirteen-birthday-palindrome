function reverseStr(str){
    let arr = str.split("");
    let reverseArr = arr.reverse();
    let reverseStr = reverseArr.join("");
    return reverseStr;
}

function isPalindrome(str){
    return str === reverseStr(str);
}

function convertDateToStr(date){
    let dateStr = { day : "" , month : "" , year : ""};
    if(date.day < 10){
        dateStr.day = "0" + date.day;
    }
    else{
        dateStr.day = date.day.toString();
    }
    if(date.month < 10){
        dateStr.month = "0" + date.month;
    }
    else{
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();
    return dateStr;
}

let date={day : "2" , month : "2" , year : "2020"};

function getAllDateFormats(date){
    let dateStr = convertDateToStr(date);
    let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    let yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
    return ([ddmmyyyy , mmddyyyy , yyyymmdd , ddmmyy , mmddyy , yymmdd]);
}

function checkPalindromeForAllTheFormats(date){
    let dateAllFormatList = getAllDateFormats(date);
    let palindromeFlag = false;
    for(let i=0;i<dateAllFormatList.length;i++){
        if(isPalindrome(dateAllFormatList[i])){
            palindromeFlag = true;
            break;
        }
    }
    return palindromeFlag;
}

function isLeapYear(year){
    if(year % 400 === 0){
        return true;
    }
    if(year % 100 === 0){
        return false;
    }
    if(year % 4 === 0){
        return true;
    }
    return false;
}

function getNextDate(date){
    let day = date.day + 1;
    let month = date.month;
    let year = date.year;

    let daysInMonth = [31 , 28 , 31 , 30 , 31 , 30 , 31 , 31 , 30 , 31 , 30 , 31];

    if(month === 2){
        if(isLeapYear(year)){
            if(day > 29){
                day = 1;
                month++;
            }
        }
        else{
            if(day > 28){
                day = 1;
                month++;
            }
        }
    }
    else{
        if(day > daysInMonth[month-1]){
            day = 1;
            month++;
        }
    }

    if(month > 12){
        month = 1;
        year++;
    }
    return {
        day: day,
        month: month,
        year: year
    };
}

function getNextPalindromeDate(date){
    let counter = 0;
    let nextDate = getNextDate(date);

    while(1){
        counter++;
        let isPalindrome = checkPalindromeForAllTheFormats(nextDate);
        if(isPalindrome){
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    
    return [counter , nextDate];
}

let dateInput = document.querySelector("#date-input");
let showBtn = document.querySelector("#show-btn");
let message = document.querySelector(".message");

showBtn.addEventListener("click", showClickListner);

function showClickListner(){
    let dateStr = dateInput.value;
    if(dateStr !== ""){
        let arrOfDate = dateStr.split("-");
        let date = {
            day : Number(arrOfDate[2]),
            month : Number(arrOfDate[1]),
            year : Number(arrOfDate[0])
        };
        
        let isPalindrome = checkPalindromeForAllTheFormats(date);
        if(isPalindrome){
            message.innerText = "Yay!! your birthday is a palindrome."
        }
        else{
            let [counter , nextDate] = getNextPalindromeDate(date);
            message.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, You missed it by ${counter}. `;
        }
    }
    else{
        message.innerText = "Please fill the input correctly."
    }
}