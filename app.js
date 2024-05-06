

var coursesApi = 'http://localhost:3000/courses';

function start() {
    getCourses(renderCourses);

    handleCreateForm();
}

start();

//get khoá học
function getCourses(callback) {
    fetch(coursesApi)
    .then(Response => {
        return Response.json();
    })
    .then(callback);
}

// load data ra ui
function renderCourses(courses) {
    var listCoursesBlock = document.querySelector('#list-courses');
         console.log(listCoursesBlock);
    var htmls = courses.map(function (course) {
         return ` 
            <li class="course-item-${course.id}">
               <h4>${course.name}</h4>
               <p>${course.description}</p>
               <button onclick="handleDeleteCourse(${course.id})">&times;</button>
               <button onclick="handleUpdateCourse(${course.id})">Update</button>
            </li>
            `;
    })
    listCoursesBlock.innerHTML =  htmls.join('');
}

// xử lí bắt summit button
function handleCreateForm() {
    var createbtn = document.querySelector('#create');
    createbtn.onclick = function () {
        var title = document.querySelector('input[name="title"]').value;
        var description = document.querySelector('input[name="description"]').value;
        var formData = {
            name: title,
            description: description,
        };
        console.log("formData :" ,formData);
        
        createCourse(formData , function () {
           getCourses(renderCourses);
        });

        console.log(title);
        console.log(description);

    }
}



// tạo dử liệu vào Api
function createCourse(data , callback) {
    var options = {
        method : "POST",
        headers : {
           'Content-Type': 'application/json'
        },
        body : JSON.stringify(data)
    }; 
    fetch(coursesApi , options)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

// xoá courses
function handleDeleteCourse(id) {
    var options = {
        method : 'DELETE',
        headers : {
            'Content-Type': 'application/json'
        },
    };
    fetch(coursesApi + '/' + id, options)
        .then(function (response) {
            return response.json();
        }) 
        .then(function () {
            var courseItem = document.querySelector('.course-item-'+ id);
            if(courseItem){
                courseItem.remove();
            }
            // getCourses(renderCourses);// render lại view
        });
}

function handleUpdateCourse(id) {
    // Lấy thông tin khóa học cần cập nhật từ API
    fetch(coursesApi + '/' + id)
        .then(function (response) {
            return response.json();
        })
        .then(function (course) {
            // Gán giá trị của khóa học vào các trường input
            document.querySelector('input[name="title"]').value = course.name;
            document.querySelector('input[name="description"]').value = course.description;
            var luubtn = document.querySelector('#luu');
            console.log("luubtn :",luubtn);
           
            luubtn.onclick = function () {
                var newTitle = document.querySelector('input[name="title"]').value;
                var newDescription = document.querySelector('input[name="description"]').value;

                // Tạo đối tượng newData chứa thông tin cập nhật
                var newData = {
                    name: newTitle,
                    description: newDescription
                };
                // Gửi yêu cầu cập nhật tới API
                var options = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newData)
                };

        
                fetch(coursesApi + '/' + id, options)
                .then(function (response) {
                    return response.json();
                })
                .then(function () {
                    // Cập nhật lại danh sách khóa học sau khi cập nhật thành công
                    getCourses(renderCourses);
                });
        };
    });
       
}


// update course
// function UpdateCourse(newData, id ) {
//     var luubtn = document.querySelector('#luu');
//     luubtn.onclick = function () {
//         var newTitle = document.querySelector('input[name="title"]').value;
//         var newDescription = document.querySelector('input[name="description"]').value;
//         var formData = {
//             name: title,
//             description: description,
//         };
//         console.log("formData :" ,formData);
        
//         createCourse(formData , function () {
//            getCourses(renderCourses);
//         });

//         console.log(title);
//         console.log(description);

//     }
    
// }