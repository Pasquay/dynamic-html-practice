function fetchCourses(){
    fetch('src/json/courses.json') //    ../../src/json/courses.json
    .then(response => {
        if(!response.ok){
            throw new Error("Cant get response");
        }
        return response.json();
    })
    .then(courses => {
        courses.forEach((course) => {
            displayCourse(course);
        })
    })
    .catch(error => {
        console.error(error);
    })
}

function displayCourse(course){
    const container = document.getElementById('course-list');
    const template = document.getElementById('course-template');
    const clone = template.content.cloneNode(true);
    
    let formattedDays = "";
    course.schedule.days.forEach((day) => {
        switch(day){
            case 'Mon':
                formattedDays += 'M';
                break;
            case 'Tue':
                formattedDays += 'T';
                break;
            case 'Wed':
                formattedDays += 'W';
                break;
            case 'Thu':
                formattedDays += 'Th';
                break;
            case 'Fri':
                formattedDays += 'F';
                break;
            case 'Sat':
                formattedDays += 'S';
                break;
            case 'Sun':
                formattedDays += 'Su';
                break;
        }
    });
    
    clone.querySelector('#course-department-id').textContent = `${course.department.toUpperCase()} - ${course.courseId}`;
    clone.querySelector('#course-title').textContent = `${course.title}`;
    clone.querySelector('#course-instructor').textContent = `${course.instructor}`;
    clone.querySelector('#course-schedule').textContent = `${formattedDays} ${course.schedule.time}`;
    clone.querySelector('#enroll-button').addEventListener("click", () => {
        enrollCourse(course);
    })

    container.append(clone);
}

function enrollCourse(course){
    const enrolledCourseContainer = document.getElementById("enrolled-course-container");
    if(enrolledCourseContainer.classList.contains('hidden')){
        enrolledCourseContainer.classList.remove('hidden');
    }

    let flag = false;
    const enrolledCourses = document.querySelectorAll('#enrolled-course');
    for(let i=0; i<enrolledCourses.length; i++) {
        const courseTitle = enrolledCourses[i].querySelector("#enrolled-course-title");
        if(courseTitle.textContent === course.title){
            flag = true;
            break;
        }
    }

    if(!flag){
        const container = document.getElementById("enrolled-course-list");
        const template = document.getElementById("enrolled-course-template");
        const clone = template.content.cloneNode(true);

        let formattedDays = "";
        course.schedule.days.forEach((day) => {
            switch(day){
                case 'Mon':
                    formattedDays += 'M';
                    break;
                case 'Tue':
                    formattedDays += 'T';
                    break;
                case 'Wed':
                    formattedDays += 'W';
                    break;
                case 'Thu':
                    formattedDays += 'Th';
                    break;
                case 'Fri':
                    formattedDays += 'F';
                    break;
                case 'Sat':
                    formattedDays += 'S';
                    break;
                case 'Sun':
                    formattedDays += 'Su';
                    break;
            }
        });

        clone.querySelector("#enrolled-course-department-id").textContent = `${course.department} - ${course.courseId}`;
        clone.querySelector("#enrolled-course-title").textContent = `${course.title}`;
        clone.querySelector("#enrolled-course-schedule").textContent = `${formattedDays} - ${course.schedule.time}`;

        container.append(clone);
    }
}