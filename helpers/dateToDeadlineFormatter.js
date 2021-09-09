const deadLineDate = (element) => {
    
    const dateToDeadline = ( date ) => {
      return `${ date.slice(6, 10) }-${ date.slice(3, 5) }-${ date.slice(0, 2) }`
    };
    
    let fullDateNow = new Date()
    let yearNow = fullDateNow.getFullYear()
    let monthNow = fullDateNow.getMonth()
    monthNow += 1
    let dateNow = fullDateNow.getDate()
    let deadline = 'now'

    element = dateToDeadline(element);

    if (+element.slice(8, 10) < dateNow && +element.slice(5, 7) <= monthNow) {
        deadline = "late"
    }

    if (element.slice(8, 10) - 7 <= dateNow && +element.slice(8, 10) > dateNow) {
        deadline = "this week"
    }

    if (+element.slice(8, 10) === dateNow) {
        deadline = "now"
    }

    if (element.slice(8, 10) - 1 === dateNow) {
        deadline = "tomorrow"
    }

    if (element.slice(8, 10) - 2 === dateNow) {
        deadline = "aftertomorrow"
    }

    if (element.slice(8, 10) - 7 > dateNow) {
        deadline = "next week"
        if (+element.slice(5, 7) === monthNow && element.slice(8, 10) - 14 > dateNow) {
            deadline = "this month"
        }
    }

    if (element.slice(5, 7) - 1 === monthNow) {
        deadline = "next month"
    }

    if (element.slice(5, 7) - 1 > monthNow) {
        deadline = "this year"
    }

    if (element.slice(0, 4) === (yearNow + 1).toString()) {
        deadline = "next year"
    }

    return deadline;

};

module.exports = deadLineDate