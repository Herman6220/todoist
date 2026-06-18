export const createTableTitle = (currDate: Date) => {
    return `table_${currDate.getDate()}_${currDate.getMonth()+1}_${currDate.getFullYear()}`;
}
