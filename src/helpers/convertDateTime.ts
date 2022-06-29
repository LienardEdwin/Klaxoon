import {MONTH} from "../config/constants";

export function convertDateTime(time: number) {
    let hours:any   = Math.floor(time / 3600); // get hours
    let minutes:any = Math.floor((time - (hours * 3600)) / 60); // get minutes
    let seconds:any = time - (hours * 3600) - (minutes * 60); //  get seconds
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}

    return hours+':'+minutes+':'+seconds; // Return is HH : MM : SS
}

export function convertDate(date: string){
    let myDate = new Date(date)

    return myDate.getDate()+" "+(MONTH[myDate.getMonth()+1])+" "+myDate.getFullYear();
}