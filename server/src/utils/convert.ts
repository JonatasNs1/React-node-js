
export function convertHour(hourString: string){
    //split retorna string
    const [hours, minutes] = hourString.split(':').map(Number)

    const minutesAnount = (hours * 60) + minutes;

    return minutesAnount;
}