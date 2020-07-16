export class DateHelper {

    static formatDate(date: Date): string {
        const monthNames = [
            "Jan", "Feb", "Mar",
            "Apr", "May", "Jun", "Jul",
            "Aug", "Sep", "Oct",
            "Nov", "Dev"
        ];

        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();

        return monthNames[monthIndex] + ' ' + day + ', ' + year;
    }

    static getPastDate(fromDate: Date, toDays: number): Date {
        const epoch = new Date().setDate(fromDate.getDate() - toDays);
        const pastDate = new Date(epoch);
        return pastDate;
    }

    static getFutureDate(fromDate: Date, toDays: number): Date {
      const epoch = new Date().setDate(fromDate.getDate() + toDays);
      const futureDate = new Date(epoch);
      return futureDate;
    }

    static formatDate_mm_dd_yy(date: Date) {
      let d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

      if (month.length < 2)
          month = '0' + month;
      if (day.length < 2)
          day = '0' + day;

      return [year, month, day].join('-');
  }


}
