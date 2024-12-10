/**
 * This function prints a monthly meeting schedule for all employees. It prioritizes placing staff in the
 * early days of the month.
 * 
 * Assumptions made:
 *  - Employees meet once a month.
 *  - Employees work Monday to Friday.
 *  - Meetings cannot extend past the specified work hours
 *  - The final meeting may end up with less employees than specified, depending 
 *  
 * 
 * @param {Number} year The year for which the calendar will be produced
 * @param {Number} month The month for which the calendar will be produced
 * @param {Number} numEmployees The number of employees to schedule
 * @param {Number} startTimeHour The hour employees start working
 * @param {Number} endTimeHour The hour employees finish work
 * @param {Number} meetingDuration How long the monthly meetings last
 * @param {Number} numMeetingRooms Number of meeting rooms to use for booking the monthly meetings
 * @param {Number} employeesPerMeeting How many employees are designated per meeting slot
 */
function getMeetingsCalendar(year, month, numEmployees, startTimeHour, endTimeHour, meetingDuration, numMeetingRoom, employeesPerMeeting) {
    // argument checks
    let argumentsValid = true;
    let yearInt = Number(year);
    if (!yearInt || yearInt < 2000 || yearInt > 2100) {
        console.log("error", "Year must be a valid year (2000-2100)");
        argumentsValid = false;
    }
    let monthInt = Number(month);
    if (!monthInt || monthInt < 1 || monthInt > 12) {
        console.log("error", "Month must be a valid month (1-12)");
        argumentsValid = false;
    }
    let numEmployeesInt = Number(numEmployees);
    let employeesPerMeetingInt = Number(employeesPerMeeting);
    if (!numEmployeesInt || numEmployeesInt < 2) {
        console.log("error", "numEmployees must be at least 2 or more.");
        argumentsValid = false;
    } else {
        if (!employeesPerMeetingInt || employeesPerMeetingInt < 1 || employeesPerMeetingInt > numEmployeesInt) {
            console.log("error", "employeesPerMeeting must be between 1 and " + numEmployeesInt);
            argumentsValid = false;
        }
    }
    let numMeetingRoomInt = Number(numMeetingRoom);
    if (!numMeetingRoomInt || numMeetingRoomInt < 1 || numMeetingRoomInt > 50) {
        console.log("error", "numMeetingRoom must be a valid number of meeting rooms (1-50)");
        argumentsValid = false;
    }
    let meetingDurationInt = Number(meetingDuration);
    if (!meetingDurationInt || meetingDurationInt < 1 || meetingDurationInt > 4) {
        console.log("error", "meetingDuration must be a valid duration (1-4)");
        argumentsValid = false;
    }
    let startTimeInt = Number(startTimeHour);
    let endTimeInt = Number(endTimeHour);
    if (!startTimeInt || startTimeInt < 0 || startTimeInt > 23) {
        console.log("error", "startTimeHour must be a valid hour (0-23)");
        argumentsValid = false;
    } else {
        if (!endTimeInt || endTimeInt < startTimeInt || endTimeInt > 23) {
            console.log("error", "endTimeHour must be between " + startTimeInt + " and 23");
            argumentsValid = false;
        }
    }

    if (!argumentsValid) {
        return;
    }


    let employeeCounter = 1;

    let stats = { totalDays: 0, totalMeetings: 0 };

    // Month in JavaScript Date is 0-indexed, so subtract 1 from the month parameter
    const startDate = new Date(yearInt, monthInt - 1, 1);
    const endDate = new Date(yearInt, monthInt, 0); // Last day of the month
    // Loop through each day of the month, and stop processing if all the employees have been assigned
    for (let day = startDate; day <= endDate && employeeCounter <= numEmployeesInt; day.setDate(day.getDate() + 1)) {
        const dayOfWeek = day.getDay();
        // Check if the day is a weekday (Monday to Friday)
        if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Sunday=0, Saturday=6

            // Loop through the meeting hours
            for (let hour = startTimeInt;
                // check that meetings do not go beyond the end time specified
                hour + meetingDurationInt <= endTimeInt
                // stop processing if all the employees have been assigned
                && employeeCounter <= numEmployeesInt;
                // increment the hour by the specified duration
                hour += meetingDurationInt) {

                // update the hours on the day object for printing
                day.setHours(hour);

                // Print the day showing the day of the week, month, year and time`
                console.log(day.toString());

                // Loop through the meeting rooms, and stop processing if all the employees have been assigned
                for (let meetingRoom = 1; meetingRoom <= numMeetingRoomInt && employeeCounter <= numEmployeesInt; ++meetingRoom) {
                    let meetingRoomAttendees = " • Meeting Room " + meetingRoom + ":";

                    // Loop through employees per room
                    // Remember the employee count and verify that we only assign the right number of
                    // employees to a room, as specified by the employeesPerMeeting parameter
                    // Ensure we never exceed the number of employee
                    for (let oldEmployeeCount = employeeCounter;
                        employeeCounter < employeesPerMeetingInt + oldEmployeeCount &&
                        employeeCounter <= numEmployeesInt;
                        ++employeeCounter) {
                        meetingRoomAttendees += " Employee " + employeeCounter + ",";
                    }
                    // remove the last comma
                    meetingRoomAttendees = meetingRoomAttendees.slice(0, -1);

                    console.log(meetingRoomAttendees);

                    stats.totalMeetings++;
                }
            }
            stats.totalDays++;
        }
    }
    console.log("Total days with meetings: ", stats.totalDays)
    console.log("Total number of meetings: ", stats.totalMeetings)
}

// get the calendar for the specified parameters
getMeetingsCalendar(2024, 10, 20, 9, 17, 1, 2, 2);