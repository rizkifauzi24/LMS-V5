//Active Link
$(function () {
    $('ul.navbar-nav li.nav-item a').filter(function () { return this.href == location.href }).parent().addClass('active').siblings().removeClass('active')
    $('ul.navbar-nav li.nav-item a').click(function () {
        $(this).parent().addClass('active').siblings().removeClass('active')
    })
})

/*Login Admin*/
$("#login").submit(function (e) {
    e.preventDefault();
    let login = new Object();

    login.Email = $("#Email").val();
    login.Password = $("#Password").val();
    console.log(login);
    $.ajax({
        url: "../Login/Auth",
        type: "POST",
        data: login,
    }).done((result) => {
        console.log(result);
        switch (result.status) {
            case 200:
                window.location.replace("/Login")               
                Swal.fire({
                    icon: 'Success',
                    title: 'Success',
                    text: 'Loggin',
                })
                break;
            case 404:
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Email Inccorect',
                })
                break;
            case 400:
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Password Inccorect',
                })
                break;
            default:
                console.log(result);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Wrong Email or Password',
                })
        }
        
    }).fail((error) => {

        console.log(error);
    })
    
})

/*Forgot Password*/
$("#forgot").submit(function (e) {
    e.preventDefault();
    let login = new Object();

    login.Email = $("#Email").val();
    //login.Password = $("#Password").val();
    console.log(login);
    $.ajax({
        url: "../Login/Forgot",
        type: "POST",
        data: login,
    }).done((result) => {
        console.log(result);
        switch (result.status) {
            case 200:
                window.location.replace("/Login/ChangePassword")
                Swal.fire({
                    icon: 'Success',
                    title: 'Success',
                    text: 'Email Sent Succesfully',
                })
                break;
            case 404:
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Email Inccorect',
                })
                break;
            case 400:
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Password Inccorect',
                })
                break;
            default:
                console.log(result);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Wrong Email or Password',
                })
        }

    }).fail((error) => {

        console.log(error);
    })

})

/*Change Password*/
$("#changePassword").submit(function (e) {
    e.preventDefault();
    let login = new Object();

    login.Email = $("#Email").val();
    login.Otp = $("#OTP").val();
    login.New_Password = $("#Password").val();
    //login.Password = $("#Password").val();
    console.log(login);
    $.ajax({
        url: "../Login/ChangePassword",
        type: "POST",
        data: login,
    }).done((result) => {
        console.log(result);
        switch (result.status) {
            case 200:
                window.location.replace("/Login")
                Swal.fire({
                    icon: 'Success',
                    title: 'Success',
                    text: 'Email Sent Succesfully',
                })
                break;
            case 404:
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Email Inccorect',
                })
                break;
            case 400:
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Password Inccorect',
                })
                break;
            default:
                console.log(result);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Wrong Email or Password',
                })
        }

    }).fail((error) => {

        console.log(error);
    })

})

/*Register Admin*/
$("#FormRegister").submit(function (e) {
    e.preventDefault();
    var obj = new Object(); //sesuaikan sendiri nama objectnya dan beserta isinya
    //ini ngambil value dari tiap inputan di form nya
    obj.firstName = $("#FirstName").val();
    obj.lastName = $("#LastName").val();
    obj.gender = $("#Gender").val();
    obj.birthdate = $("#BirthDate").val();
    obj.phone = $("#Phone").val();
    obj.email = $("#Email").val();
    obj.password = $("#Password").val();
    console.log(obj);
    //isi dari object kalian buat sesuai dengan bentuk object yang akan di post
    $.ajax({
        url: "../Register/Register",
        type: "POST",
        /*        contentType: "application/json",*/
        data: obj, //jika terkena 415 unsupported media type (tambahkan headertype Json & JSON.Stringify(obj);)
    }).done((result) => {
        window.location.replace("/Login")
        Swal.fire({
            icon: 'success',
            title: 'Success',
        })
    }).fail((error) => {
        //alert pemberitahuan jika gagal
        /*alert("Data Not Inserted");*/
        console.log(error)
    })
})


/* Data Dashboard*/
//Section JS Dashboard Admin
/*Total User*/
$.ajax({
    url: "https://localhost:44306/API/User",
}).done((result) => {
    console.log(result)
    let totalUser = result.length;
    $("#totalUser").html(totalUser);
})
/*Total Course*/
$.ajax({
    url: "https://localhost:44306/API/Course",
}).done((result) => {
    console.log(result)
    let totalCourse = result.length;
    $("#totalCourse").html(totalCourse);
})
/*Total Transaksi*/
$.ajax({
    url: "https://localhost:44306/API/Transaction",
}).done((result) => {
    console.log(result)

    let totalTr = result.length;
    console.log(totalTr)
    $("#TotalTr").html(totalTr);
})
//DONUT Chart GENDER
$.ajax({
    url: "https://localhost:44306/API/User",
}).done((result) => {

    let CM = 0;
    let CF = 0;
    console.log(result);

    $.each(result, function (key, val) {

        if (val.gender == 0) {
            CM += 1;
        }
        else {
            CF += 1;
        }

    })
    console.log(CM);
    console.log(CF);

    var totalgender = CM + CF;

    var options = {
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: '22px',
                            fontFamily: 'Rubik',
                            color: '#dfsda',
                            offsetY: -10
                        },
                        value: {
                            show: true,
                            fontSize: '16px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            color: undefined,
                            offsetY: 16,
                            formatter: function (val) {
                                return val
                            }
                        },
                        total: {
                            show: true,
                            label: 'Total',
                            color: '#373d3f',
                            formatter: function (w) {
                                return w.globals.seriesTotals.reduce((a, b) => {
                                    return a + b
                                }, 0)
                            }
                        }
                    }
                }
            }
        },
        chart: {
            type: 'donut',
            animations:
            {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150
                }
            },
            dynamicAnimation:
            {
                enabled: true,
                speed: 350
            },
            toolbar: {
                show: true,
                offsetX: 0,
                offsetY: 0,
                tools:
                {
                    download: true,
                    selection: true,
                    zoom: true,
                    zoomin: true,
                    zoomout: true,
                    pan: true,
                    reset: true | '<img src="/static/icons/reset.png" width="20">',
                    customIcons: []
                },
                export:
                {
                    csv:
                    {
                        filename: undefined,
                        columnDelimiter: ',',
                        headerCategory: 'category',
                        headerValue: 'value',
                        dateFormatter(timestamp) {
                            return new Date(timestamp).toDateString()
                        }

                    }
                },
                svg: {
                    filename: undefined,
                },
                png: {
                    filename: undefined,
                },
                autoSelected: 'zoom'
            },
        },

        series: [CM, CF],
        labels: ['Male', 'Female']
    }



    var chart = new ApexCharts(document.querySelector("#myChart"), options);

    chart.render();

});
//Bart Char Topic
$.ajax({
    url: "https://localhost:44306/API/Topic",
}).done((result) => {
    let obj = [];
    let Tname = [];
    result.forEach(function (e) {

        console.log(e);
        obj.push(e.topicId);
        Tname.push(e.name);

    })
    console.log(obj);


    $.ajax({
        url: "https://localhost:44306/API/Course",
    }).done((res) => {

        console.log(res);

        let jumlah = [];

        obj.forEach(function (f) {

            let item = res.filter(g => g.topicId === f);
            console.log(item);
            jumlah.push(item.length)
        })
        console.log(jumlah);
        console.log(Tname);



        var options = {
            chart: {
                type: 'bar'
            },
            series: [{
                name: 'Topic',
                data: jumlah
            }],
            xaxis: {
                categories: Tname
            }
        }

        var chart = new ApexCharts(document.querySelector("#Chart"), options);

        chart.render();

    })
});



/*CRUD Topic*/
//DatatableTopic
$(document).ready(function () {
    /*Topic Admin*/
    let t = $('#DataTable_Topic').DataTable({
        language: {
            paginate: {
                next: '<i class="fas fa-angle-right">',
                previous: '<i class="fas fa-angle-left">'
            }
        },
        dom: 'lBfrtip',
        "buttons": [
            /*'copy', 'csv', 'excel', 'pdf', 'print'*/
            {
                extend: 'pdf', title: 'Data Master Topic',
                className: 'btn btn-sm btn-danger glyphicon glyphicon-file',
                text: '<i class="far fa-file-pdf"></i>',
                titleAttr: 'PDF',
                exportOptions: {
                    columns: [0, 1, 2]
                }
            },
            {
                extend: 'excel', title: 'Data Master Topic',
                className: 'btn btn-sm btn-success  glyphicon glyphicon-list-alt',
                text: '<i class="fas fa-file-excel"></i>',
                titleAttr: 'Excel',
                exportOptions: {
                    columns: [0, 1, 2]
                }
            },
            {
                extend: 'csv', title: 'Data Master Topic',
                className: 'btn btn-sm btn-success  glyphicon glyphicon-save-file',
                text: '<i class="fas fa-file-csv"></i>',
                titleAttr: 'CSV',
                exportOptions: {
                    columns: [0, 1, 2]
                }
            },
            {
                extend: 'copy', title: 'Data Master Topic',
                className: 'btn btn-sm btn-warning  glyphicon glyphicon-duplicate',
                text: '<i class="far fa-copy"></i>',
                titleAttr: 'COPY',
                exportOptions: {
                    columns: [0, 1, 2]
                }
            },
            {
                extend: 'print', title: 'Data Master Topic',
                className: 'btn btn-sm btn-dark  glyphicon glyphicon-print',
                text: '<i class="fas fa-print"></i>',
                titleAttr: 'PRINT',
                exportOptions: {
                    columns: [0, 1, 2]
                }
            }
        ],
        initComplete: function () {
            var btns = $('.dt-button');
            //btns.addClass('btn btn-primary btn-sm');
            btns.removeClass('dt-button');
        },
        "ajax": {
            "url": "https://localhost:44306/API/Topic",
            "dataType": "json",
            "dataSrc": ""
        },
        "columns": [
            {
                "data": null, "sortable": false,
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                },
                //width: "20px"
            },
            {
                "data": "name"

            },
            {
                "data": "topicId",
                render: function (data, type, row, meta) {
                    return `<button onclick="DetailTopic(${data})" class="btn btn-success btn-sm" data-toggle="modal" data-target="#detailTopic">
                              <i class="fas fa-edit"></i>
                            </button>
                            <button onclick="DeleteTopic(${data})" class="btn btn-danger btn-sm" >
                              <i class="fas fa-trash"></i>
                            </button>`
                },
                //width: "50px"

            }
        ]

    });
    t.on("order.dt search.dt", () => {
        let i = 1
        t.cells(null, 0, { search: "applied", order: "applied" }).every(function (cell) {
            this.data(i++)
        })
    }).draw()

})

//InsertTopic
$("#topicInsert").submit(function (e) {
    e.preventDefault();

    let obj = {
        name: document.getElementById("IName").value
    };

    if (obj.name == "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to insert topic !',
        })

    } else {
        $.ajax({
            "url": "https://localhost:44306/API/Topic",
            type: "POST",
            crossDomain: true,
            data: obj,
            data: JSON.stringify(obj),
            contentType: 'application/json;charset=utf-8',
        }).done((result) => {
            Swal.fire({
                position: 'Center',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
            })
            $("#ModalTopic").modal('hide');
            $('#DataTable_Topic').DataTable().ajax.reload();
            document.getElementById("topicInsert").reset();
            $("#topicInsert").attr("class", "needs-validation");
        }).fail((error) => {
            console.log(error);
            alert("Insert Gagal");

        })
    }

})

//DetailTopic
function DetailTopic(id) {
    $.ajax({
        url: "https://localhost:44306/API/Topic/" + id
    }).done((result) => {
        console.log(result)
        $("#UTname").val(result.name);
        $("#UTid").val(result.topicId);

    });
}

//UpdateTopic
$("#topicUpdate").submit(function (e) {
    e.preventDefault();

    let obj = {
        topicId: parseInt(document.getElementById("UTid").value),
        name: document.getElementById("UTname").value,
    }

    console.log(obj);



    $.ajax({
        url: "https://localhost:44306/API/Topic",
        type: "PUT",
        data: obj,
        /*  crossDomain: true,*/
        data: JSON.stringify(obj),
        contentType: 'application/json;charset=utf-8',
    }).done((result) => {
        $("#detailTopic").modal('hide');
        Swal.fire({
            position: 'Center',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
        })
        $('#DataTable_Topic').DataTable().ajax.reload();
    }).fail((error) => {
        console.log(error);
        alert("Update Gagal");

    })


})

//DeleteTopic
function DeleteTopic(id) {

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "https://localhost:44306/API/Topic/" + id,
                type: "DELETE",
            }).done((result) => {
                $('#DataTable_Topic').DataTable().ajax.reload();
            }).fail((error) => {
                console.log(error);
                alert("Delete Gagal");

            })
            swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
            )
        }
    })


}


/*CRUD Course*/
//DataTables
$(document).ready(function () {
    $('#DataTable_Course').DataTable({
        language: {
            paginate: {
                next: '<i class="fas fa-angle-right">',
                previous: '<i class="fas fa-angle-left">'
            }
        },
        dom: 'lBfrtip',
        buttons: [
            /*'copy', 'csv', 'excel', 'pdf', 'print'*/
            {
                extend: 'pdf', title: 'Data Master Course',
                className: 'btn btn-sm btn-danger glyphicon glyphicon-file',
                text: '<i class="far fa-file-pdf"></i>',
                titleAttr: 'PDF',
                exportOptions: {
                    columns: [0, 1, 2]
                }
            },
            {
                extend: 'excel', title: 'Data Master Course',
                className: 'btn btn-sm btn-success  glyphicon glyphicon-list-alt',
                text: '<i class="fas fa-file-excel"></i>',
                titleAttr: 'Excel',
                exportOptions: {
                    columns: [0, 1, 2]
                }
            },
            {
                extend: 'csv', title: 'Data Master Course',
                className: 'btn btn-sm btn-success  glyphicon glyphicon-save-file',
                text: '<i class="fas fa-file-csv"></i>',
                titleAttr: 'CSV',
                exportOptions: {
                    columns: [0, 1, 2]
                }
            },
            {
                extend: 'copy', title: 'Data Master Course',
                className: 'btn btn-sm btn-warning  glyphicon glyphicon-duplicate',
                text: '<i class="far fa-copy"></i>',
                titleAttr: 'COPY',
                exportOptions: {
                    columns: [0, 1, 2]
                }
            },
            {
                extend: 'print', title: 'Data Master Course',
                className: 'btn btn-sm btn-dark  glyphicon glyphicon-print',
                text: '<i class="fas fa-print"></i>',
                titleAttr: 'PRINT',
                exportOptions: {
                    columns: [0, 1, 2]
                }
            }
        ],
        initComplete: function () {
            var btns = $('.dt-button');
            //btns.addClass('btn btn-primary btn-sm');
            btns.removeClass('dt-button');
        },
        "ajax": {
            "url": "https://localhost:44306/API/Course/GetCourse",
            "dataType": "json",
            "dataSrc": ""
        },
        "columns": [
            {
                "data": null, "sortable": false,
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            {
                "data": "topic",
                //render: function (data, type, row, meta) {
                //    let trimResponse = "";
                //    $.ajax({
                //        url: "https://localhost:44306/API/Topic/" + data,
                //        success: function (resp) {
                //            trimResponse += resp.name;
                //            console.log(trimResponse); //works! I can see the item names in console log
                //        }
                //    })
                //    return `${trimResponse}`;
                //}
            },
            {
                "data": "name"
            },
            {
                "data": "price",
                render: function (data) {
                    var result = data;
                    return `<span>Rp.${result}</span>`
                }
            },
            {
                "data": "courseId",
                render: function (data, type, row, meta) {
                    return `<div class="text-center">
                            <button type="button" onClick="detail('${data}')" class="btn btn-sm btn-success" data-toggle="modal" data-target="#modalsUpdateCourse">
                            <i class="fas fa-edit"></i>
                            </button><button type="button" onClick="Delete('https://localhost:44306/API/Course/${data}')" class="btn btn-sm btn-danger" data-toggle="modal">
                            <i class="fas fa-trash"></i>
                            </button>
                            </div>`;
                }

            }
        ]

    });

})

$.ajax({
    url: "https://localhost:44306/API/Topic"
}).done((res) => {
    let top = "";
    for (var i = 0; i < res.length; i++) {
        top += `<option value="${res[i].topicId}">${res[i].name}</option>`
    }
    let option = `<option value="">Select Topic</option>` + top
    $(".topic").html(option);
    $(".topics").html(option);
})


//Insert
$("#form_addCourse").submit(function (e) {
    e.preventDefault();
    var obj = new Object(); //sesuaikan sendiri nama objectnya dan beserta isinya
    //ini ngambil value dari tiap inputan di form nya
    obj.topicId = parseInt($("#topicId").val());
    obj.name = $("#nameCourse").val();
    obj.description = $("#description").val();
    obj.price = parseInt($("#price").val());
    console.log(obj);
    //isi dari object kalian buat sesuai dengan bentuk object yang akan di post
    $.ajax({
        url: ("https://localhost:44306/API/Course"),
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(obj) //jika terkena 415 unsupported media type (tambahkan headertype Json & JSON.Stringify(obj);)
    }).done((result) => {
        $("#modalsCourse").modal('hide');
        document.getElementById("form_addCourse").reset();
        Swal.fire({
            icon: 'success',
            title: 'Add Course Success',
        })
        $("#form_addCourse").attr("class", "needs-validation");
        let table = $("#DataTable_Course").DataTable();
        table.ajax.reload();
    }).fail((error) => {
        console.log(error)
    })
})

//Update
function detail(data) {
    $.ajax({
        url: "https://localhost:44306/API/Course/" + data
    }).done((item) => {
        /*let item = e.find(item => item.courseId === data)*/
        $("#UcourseId").attr("value", item.courseId);

        $.ajax({
            url: "https://localhost:44306/API/Topic",
        }).done((result) => {

            let itemTopic = result.find(e => e.topicId === item.topicId);
            console.log(itemTopic);

            $(".topics").val(itemTopic.topicId);
        })

        $("#UnameCourse").attr("value", item.name);
        $("#Udescription").val(item.description);
        $("#Uprice").attr("value", item.price);
        console.log(item);
    })
}

$("#form_updateCourse").submit(function (e) {
    e.preventDefault();
    var obj = new Object(); //sesuaikan sendiri nama objectnya dan beserta isinya
    //ini ngambil value dari tiap inputan di form nya
    obj.courseId = parseInt($("#UcourseId").val());
    obj.topicId = parseInt($("#UtopicId").val());
    obj.name = $("#UnameCourse").val();
    obj.description = $("#Udescription").val();
    obj.price = parseInt($("#Uprice").val());
    console.log(obj);
    //isi dari object kalian buat sesuai dengan bentuk object yang akan di post
    $.ajax({
        url: ("https://localhost:44306/API/Course"),
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(obj) //jika terkena 415 unsupported media type (tambahkan headertype Json & JSON.Stringify();)
    }).done((result) => {
        $("#modalsUpdateCourse").modal('hide');
        Swal.fire({
            icon: 'success',
            title: 'Update Success',
        })
        let table = $("#DataTable_Course").DataTable();
        table.ajax.reload();
    }).fail((error) => {
        console.log(error)
    })
})

//Delete
function Delete(urlEmp) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: urlEmp,
                type: "DELETE",
                contentType: "application/json",
                //jika terkena 415 unsupported media type (tambahkan headertype Json & JSON.Stringify();)
            }).done((result) => {
                let table = $("#DataTable_Course").DataTable();
                table.ajax.reload();
            }).fail((error) => {
                console.log(error)
            })
            swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
            )
        }
    })
}

//Reset Modals Update
$('#modalsAddCourse').on('hidden.bs.modal', function () {
    $(this).find('form').trigger('reset');
    $('#form_updateCourse').attr("class", "needs-validation");
})

//Reset modals Insert
$('#modalsUpdateCourse').on('hidden.bs.modal', function () {
    $(this).find('form').trigger('reset');
    $('#form_addCourse').attr("class", "needs-validation");
})


/*CRUD Section*/
//DataTables
$(document).ready(function () {
    $('#DataTable_Section').DataTable({
        language: {
            paginate: {
                next: '<i class="fas fa-angle-right">',
                previous: '<i class="fas fa-angle-left">'
            }
        },
        dom: 'lBfrtip',
        buttons: [
            /*'copy', 'csv', 'excel', 'pdf', 'print'*/
            {
                extend: 'pdf', title: 'Data Master Course',
                className: 'btn btn-sm btn-danger glyphicon glyphicon-file',
                text: '<i class="far fa-file-pdf"></i>',
                titleAttr: 'PDF',
                exportOptions: {
                    columns: [0, 1, 2]
                }
            },
            {
                extend: 'excel', title: 'Data Master Course',
                className: 'btn btn-sm btn-success  glyphicon glyphicon-list-alt',
                text: '<i class="fas fa-file-excel"></i>',
                titleAttr: 'Excel',
                exportOptions: {
                    columns: [0, 1, 2]
                }
            },
            {
                extend: 'csv', title: 'Data Master Course',
                className: 'btn btn-sm btn-success  glyphicon glyphicon-save-file',
                text: '<i class="fas fa-file-csv"></i>',
                titleAttr: 'CSV',
                exportOptions: {
                    columns: [0, 1, 2]
                }
            },
            {
                extend: 'copy', title: 'Data Master Course',
                className: 'btn btn-sm btn-warning  glyphicon glyphicon-duplicate',
                text: '<i class="far fa-copy"></i>',
                titleAttr: 'COPY',
                exportOptions: {
                    columns: [0, 1, 2]
                }
            },
            {
                extend: 'print', title: 'Data Master Course',
                className: 'btn btn-sm btn-dark  glyphicon glyphicon-print',
                text: '<i class="fas fa-print"></i>',
                titleAttr: 'PRINT',
                exportOptions: {
                    columns: [0, 1, 2]
                }
            }
        ],
        initComplete: function () {
            var btns = $('.dt-button');
            //btns.addClass('btn btn-primary btn-sm');
            btns.removeClass('dt-button');
        },
        "ajax": {
            "url": "https://localhost:44306/API/Section/GetSection",
            "dataType": "json",
            "dataSrc": ""
        },
        "columns": [
            {
                "data": null, "sortable": false,
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            {
                "data": "course",
                //render: function (data, type, row, meta) {
                //    let trimResponse = "";
                //    $.ajax({
                //        url: "https://localhost:44306/API/Topic/" + data,
                //        success: function (resp) {
                //            trimResponse += resp.name;
                //            console.log(trimResponse); //works! I can see the item names in console log
                //        }
                //    })
                //    return `${trimResponse}`;
                //}
            },
            {
                "data": "name"
            },
            {
                "data": "link"
            },
            {
                "data": "sectionId",
                render: function (data, type, row, meta) {
                    return `<div class="text-center">
                            <button type="button" onClick="detailSection('${data}')" class="btn btn-sm btn-success" data-toggle="modal" data-target="#modalsUpdateSection">
                            <i class="fas fa-edit"></i>
                            </button><button type="button" onClick="DeleteSection('https://localhost:44306/API/Section/${data}')" class="btn btn-sm btn-danger" data-toggle="modal">
                            <i class="fas fa-trash"></i>
                            </button>
                            </div>`;
                }

            }
        ]

    });

})

$.ajax({
    url: "https://localhost:44306/API/Course"
}).done((res) => {
    let top = "";
    for (var i = 0; i < res.length; i++) {
        top += `<option value="${res[i].courseId}">${res[i].name}</option>`
    }
    let option = `<option value="">Select Course</option>` + top
    $(".coursee").html(option);
    $(".coursees").html(option);
})

$("#form_addSection").submit(function (e) {
    e.preventDefault();
    var obj = new Object(); //sesuaikan sendiri nama objectnya dan beserta isinya
    //ini ngambil value dari tiap inputan di form nya
    obj.courseId = parseInt($("#courseId").val());
    obj.name = $("#nameSection").val();
    obj.description = $("#description").val();
    obj.link = $("#link").val();
    console.log(obj);
    //isi dari object kalian buat sesuai dengan bentuk object yang akan di post
    $.ajax({
        url: ("https://localhost:44306/API/Section"),
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(obj) //jika terkena 415 unsupported media type (tambahkan headertype Json & JSON.Stringify(obj);)
    }).done((result) => {
        $("#modalsSection").modal('hide');
        document.getElementById("form_addSection").reset();
        Swal.fire({
            icon: 'success',
            title: 'Add Course Success',
        })
        $("#form_addSection").attr("class", "needs-validation");
        let table = $("#DataTable_Section").DataTable();
        table.ajax.reload();
    }).fail((error) => {
        console.log(error)
    })
})

//Update
function detailSection(data) {
    $.ajax({
        url: "https://localhost:44306/API/Section/" + data
    }).done((item) => {
        /*let item = e.find(item => item.courseId === data)*/
        $("#UsectionId").attr("value", item.sectionId);

        $.ajax({
            url: "https://localhost:44306/API/Course",
        }).done((result) => {

            let itemCourse = result.find(e => e.courseId === item.courseId);
            console.log(itemCourse);

            $(".coursees").val(itemCourse.courseId);
        })

        $("#UnameSection").attr("value", item.name);
        $("#Udescription").val(item.description);
        $("#Ulink").attr("value", item.link);
        console.log(item);
    })
}

$("#form_updateSection").submit(function (e) {
    e.preventDefault();
    var obj = new Object(); //sesuaikan sendiri nama objectnya dan beserta isinya
    //ini ngambil value dari tiap inputan di form nya
    obj.sectionId = parseInt($("#UsectionId").val());
    obj.courseId = parseInt($("#UcourseId").val());
    obj.name = $("#UnameSection").val();
    obj.description = $("#Udescription").val();
    obj.link = $("#Ulink").val();
    console.log(obj);
    //isi dari object kalian buat sesuai dengan bentuk object yang akan di post
    $.ajax({
        url: ("https://localhost:44306/API/Section"),
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(obj) //jika terkena 415 unsupported media type (tambahkan headertype Json & JSON.Stringify();)
    }).done((result) => {
        $("#modalsUpdateSection").modal('hide');
        Swal.fire({
            icon: 'success',
            title: 'Update Success',
        })
        let table = $("#DataTable_Section").DataTable();
        table.ajax.reload();
    }).fail((error) => {
        console.log(error)
    })
})

//Delete
function DeleteSection(urlEmp) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: urlEmp,
                type: "DELETE",
                contentType: "application/json",
                //jika terkena 415 unsupported media type (tambahkan headertype Json & JSON.Stringify();)
            }).done((result) => {
                let table = $("#DataTable_Section").DataTable();
                table.ajax.reload();
            }).fail((error) => {
                console.log(error)
            })
            swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
            )
        }
    })
}

//Reset Modals Update
$('#modalsAddSection').on('hidden.bs.modal', function () {
    $(this).find('form').trigger('reset');
    $('#form_updateSection').attr("class", "needs-validation");
})

//Reset modals Insert
$('#modalsUpdateSection').on('hidden.bs.modal', function () {
    $(this).find('form').trigger('reset');
    $('#form_addSection').attr("class", "needs-validation");
})







/*CRUD User*/
//DataTables
$(document).ready(function () {
    $('#DataTable_User').DataTable({
        language: {
            paginate: {
                next: '<i class="fas fa-angle-right">',
                previous: '<i class="fas fa-angle-left">'
            }
        },
        dom: 'lBfrtip',
        buttons: [
            //'copy', 'csv', 'excel', 'pdf', 'print'
            /*'copy', 'csv', 'excel', 'pdf', 'print'*/
            {
                extend: 'pdf', title: 'Data Master User',
                className: 'btn btn-sm btn-danger glyphicon glyphicon-file',
                text: '<i class="far fa-file-pdf"></i>',
                titleAttr: 'PDF',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5]
                }
            },
            {
                extend: 'excel', title: 'Data Master User',
                className: 'btn btn-sm btn-success  glyphicon glyphicon-list-alt',
                text: '<i class="fas fa-file-excel"></i>',
                titleAttr: 'Excel',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5]
                }
            },
            {
                extend: 'csv', title: 'Data Master User',
                className: 'btn btn-sm btn-success  glyphicon glyphicon-save-file',
                text: '<i class="fas fa-file-csv"></i>',
                titleAttr: 'CSV',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5]
                }
            },
            {
                extend: 'copy', title: 'Data Master User',
                className: 'btn btn-sm btn-warning  glyphicon glyphicon-duplicate',
                text: '<i class="far fa-copy"></i>',
                titleAttr: 'COPY',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5]
                }
            },
            {
                extend: 'print', title: 'Data Master User',
                className: 'btn btn-sm btn-dark  glyphicon glyphicon-print',
                text: '<i class="fas fa-print"></i>',
                titleAttr: 'PRINT',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5]
                }
            }
        ],
        initComplete: function () {
            var btns = $('.dt-button');
            //btns.addClass('btn btn-primary btn-sm');
            btns.removeClass('dt-button');
        },
        "ajax": {
            "url": "https://localhost:44306/API/User/GetAll",
            "dataType": "json",
            //"dataSrc" : ""
            "dataSrc": function (json) {
                return json.filter(function (item) {
                    return item.isDelete == 0;
                });
            },
        },
        "columns": [
            {
                "data": null, "sortable": false,
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            {
                "data": "firstName",
                "render": function (data, type, row) {
                    return data + ' ' + row['lastName'];
                }
            },
            {
                "data": "gender"
            },
            {
                "data": "birthdate",
                "render": function (data) {
                    var date = new Date(data);
                    var month = date.getMonth() + 1;
                    return date.getDate() + "/" + (month.length > 1 ? month : "0" + month) + "/" + date.getFullYear();
                    //    //return date;
                }
            },
            {
                "data": "phone",
                render: function (data) {
                    var telp = data;
                    var result = telp.substring(1);
                    return `<span>+62${result}</span>`;
                }
            },
            {
                "data": "email"
            },
            {
                "data": "userId",
                render: function (data, type, row, meta) {
                    return `<button type="button" class="btn btn-success btn-sm" onclick="getDataCustomer('${data}')" data-toggle="modal" data-target="#updateData">
                              <i class="fas fa-edit"></i>
                            </button>
                            <button type="button" class="btn btn-danger btn-sm" onclick="deleteDataCustomer('${data}')" data-toggle="modal">
                              <i class="fas fa-trash-alt"></i>
                            </button>`
                }
            }
        ]

    });

})

//Insert User
$("#FormAddCustomer").submit(function (e) {
    e.preventDefault();
    var obj = new Object(); //sesuaikan sendiri nama objectnya dan beserta isinya
    //ini ngambil value dari tiap inputan di form nya
    obj.firstName = $("#FirstName").val();
    obj.lastName = $("#LastName").val();
    obj.gender = $("#Gender").val();
    obj.birthdate = $("#BirthDate").val();
    obj.phone = $("#Phone").val();
    obj.email = $("#Email").val();
    obj.password = $("#Password").val();
    console.log(obj);
    //isi dari object kalian buat sesuai dengan bentuk object yang akan di post
    $.ajax({
        url: "../Register/Register",
        type: "POST",
        /*        contentType: "application/json",*/
        data: obj, //jika terkena 415 unsupported media type (tambahkan headertype Json & JSON.Stringify(obj);)
    }).done((result) => {
        switch (result.status) {
            case 200:
                $('#addData').modal('hide');
                $('#DataTable_User').DataTable().ajax.reload();
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                })
                document.getElementById("FormAddCustomer").reset();
                $("#FormAddCustomer").attr("class", "needs-validation");
                break;
            case 400:
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'E-mail already used',
                })

                console.log(result);
                break;
            case 404:
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Phone already used',
                })

                console.log(result);
                break;
        }
    }).fail((error) => {
        //alert pemberitahuan jika gagal
        /*alert("Data Not Inserted");*/
        console.log(error)
    })
})


//GetById User
function getDataCustomer(id) {
    $.ajax({
        url: "https://localhost:44306/API/User/" + id

    }).done((res) => {
        //let item = res.find(item => item.userId === data);
        console.log(res);

        $("#userId2").attr("value", res.userId);
        $("#FirstName2").attr("value", res.firstName);
        $("#LastName2").attr("value", res.lastName);
        //$("#BirthDate2").attr("value", res.birthdate);
        document.getElementById("BirthDate2").value = moment(res.birthdate).format("yyyy-MM-DD");
        if (res.gender === 0) {
            //$("#male").attr("selected", "selected");
            $("#Gender2").val(0);
        }
        if (res.gender === 1) {
            //$("#female").attr("selected", "selected");
            $("#Gender2").val(1);
        }
        $("#Phone2").attr("value", res.phone);
        $("#Email2").attr("value", res.email);
    })
}

//Update User
$('#FormUpdateCustomer').submit(function (e) {
    e.preventDefault();

    let obj = new Object(); //sesuaikan sendiri nama objectnya dan beserta isinya
    //ini ngambil value dari tiap inputan di form nya
    obj.UserId = parseInt($("#userId2").val());
    obj.firstName = $("#FirstName2").val();
    obj.lastName = $("#LastName2").val();
    obj.Gender = parseInt($("#Gender2").val());
    obj.Birthdate = $("#BirthDate2").val();
    obj.Phone = $("#Phone2").val();
    obj.Email = $("#Email2").val();


    console.log(obj);
    //isi dari object kalian buat sesuai dengan bentuk object yang akan di post
    $.ajax({
        url: "https://localhost:44306/API/User",
        type: "PUT",
        contentType: 'application/json',
        data: JSON.stringify(obj), //jika terkena 415 unsupported media type (tambahkan headertype Json & JSON.Stringify();)
    }).done((result) => {
        //buat alert pemberitahuan jika success

        $('#updateData').modal('hide');
        console.log(result);
        $('#DataTable_User').DataTable().ajax.reload();
        Swal.fire({
            icon: 'success',
            title: 'Data has been updated',
        })
        //$('#FormUpdateCustomer').attr("class", "needs-validation");
    }).fail((error) => {
        //alert pemberitahuan jika gagal
        alert('Data not updated');
        console.log(error)
    })
})

//Reset Form After Update
$('#updateData').on('hidden.bs.modal', function () {
    $(this).find('form').trigger('reset');
})

//Delete User
function deleteDataCustomer(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
            if (result) {
                $.ajax({
                    url: "https://localhost:44306/API/User/" + id

                }).done((res) => {
                    //let item = res.find(item => item.userId === data);
                    console.log(res);

                    let obj = new Object(); //sesuaikan sendiri nama objectnya dan beserta isinya
                    //ini ngambil value dari tiap inputan di form nya
                    obj.UserId = res.userId;
                    obj.isDelete = true;
                    console.log(obj);
                    //isi dari object kalian buat sesuai dengan bentuk object yang akan di post
                    $.ajax({
                        url: "https://localhost:44306/API/User",
                        type: "PUT",
                        contentType: 'application/json',
                        data: JSON.stringify(obj), //jika terkena 415 unsupported media type (tambahkan headertype Json & JSON.Stringify();)
                    }).done((result) => {
                        //buat alert pemberitahuan jika success

                        $('#updateData').modal('hide');
                        console.log(result);
                        $('#DataTable_User').DataTable().ajax.reload();
                        //Swal.fire({
                        //    icon: 'success',
                        //    title: 'Data has been updated',
                        //})
                    }).fail((error) => {
                        //alert pemberitahuan jika gagal
                        alert('Data not updated');
                        console.log(error)
                    })
                })
            }
        }
    })
}




/*CRUD Transaction Decline*/
//Datatables
//DataTables
$(document).ready(function () {
    $('#DataTable_transactionWaiting').DataTable({
        language: {
            paginate: {
                next: '<i class="fas fa-angle-right">',
                previous: '<i class="fas fa-angle-left">'
            }
        },
        dom: 'lBfrtip',
        buttons: [
            //'copy', 'csv', 'excel', 'pdf', 'print'
            /*'copy', 'csv', 'excel', 'pdf', 'print'*/
            {
                extend: 'pdf', title: 'Data Master User',
                className: 'btn btn-sm btn-danger glyphicon glyphicon-file',
                text: '<i class="far fa-file-pdf"></i>',
                titleAttr: 'PDF',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5]
                }
            },
            {
                extend: 'excel', title: 'Data Master User',
                className: 'btn btn-sm btn-success  glyphicon glyphicon-list-alt',
                text: '<i class="fas fa-file-excel"></i>',
                titleAttr: 'Excel',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5]
                }
            },
            {
                extend: 'csv', title: 'Data Master User',
                className: 'btn btn-sm btn-success  glyphicon glyphicon-save-file',
                text: '<i class="fas fa-file-csv"></i>',
                titleAttr: 'CSV',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5]
                }
            },
            {
                extend: 'copy', title: 'Data Master User',
                className: 'btn btn-sm btn-warning  glyphicon glyphicon-duplicate',
                text: '<i class="far fa-copy"></i>',
                titleAttr: 'COPY',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5]
                }
            },
            {
                extend: 'print', title: 'Data Master User',
                className: 'btn btn-sm btn-dark  glyphicon glyphicon-print',
                text: '<i class="fas fa-print"></i>',
                titleAttr: 'PRINT',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5]
                }
            }
        ],
        initComplete: function () {
            var btns = $('.dt-button');
            //btns.addClass('btn btn-primary btn-sm');
            btns.removeClass('dt-button');
        },
        "ajax": {
            "url": "https://localhost:44306/API/Transaction/GetTransaction",
            "dataType": "json",
            "dataSrc": function (json) {
                return json.filter(function (item) {
                    return item.status == "Waiting";
                });
            },
        },
        "columns": [
            {
                "data": null, "sortable": false,
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            {
                "data": "user"
            },
            {
                "data": "course"
            },
            {
                "data": "status"
            },
            {
                "data": "date",
                "render": function (data) {
                    var date = new Date(data);
                    var month = date.getMonth() + 1;
                    return date.getDate() + "/" + (month.length > 1 ? month : "0" + month) + "/" + date.getFullYear();
                    //    //return date;
                }
            },
            {
                "data": "transactionId",
                render: function (data, type, row, meta) {
                    return `<button type="button" class="btn btn-success btn-sm" onclick="getTransactionWaiting('${data}')" data-toggle="modal" data-target="#modalsTransactionWaiting">
                              <i class="fas fa-eye"></i>
                            </button>
                            `
                }
            }
        ]

    });

})

//Total Payment Waiting
$.ajax({
    url: "https://localhost:44306/API/Transaction"
}).done((result) => {
    //Notif waiting dashboard
    item = result.filter(g => g.status == 2);
    let total = item.length;

    if (total == 0) {

        var a = document.getElementById('Notifwaiting');



    }
    $("#totalWaiting").html(total);
});

//Detail
function getTransactionWaiting(data) {
    $.ajax({
        url: "https://localhost:44306/API/Transaction/GetTransaction"

    }).done((res) => {
        let item = res.find(item => item.transactionId === parseInt(data));
        console.log(item);

        $("#TW_transactionId").attr("value", item.transactionId);
        $('#TWName').html(item.user);
        $('#TWCourse').html(item.course);
        $('#TWDate').html(moment(item.date).format("DD-MM-YYYY"));
        $("#TWuserId").attr("value", item.userId);
        $("#TWcourseId").attr("value", item.courseId);
        $("#TWdate1").attr("value", item.date);

        $("#TWGambar").html(item.bukti_Pembayaran);



        let string = item.bukti_Pembayaran;
        $("#imgGetProof").attr("src", "data:image/png;base64," + string);

        $("#TW_userId").attr("value", item.user);
        $("#TW_courseId").attr("value", item.course);
        /*$("#TW_status").attr("value", res.status);*/
        if (item.status === 0) {
            $("#TW_status").val(0);
        }
        if (item.status === 1) {
            $("#TW_status").val(1);
        }
        if (item.status === 2) {
            $("#TW_status").val(2);
        }

    })
}

//Accept Transaction
function TACC() {

    let obj = {

        transactionId: parseInt(document.getElementById("TW_transactionId").value),
        userId: parseInt(document.getElementById("TWuserId").value),
        courseId: parseInt(document.getElementById("TWcourseId").value),
        status: 0,
        date: document.getElementById("TWdate1").value,
        bukti_pembayaran: document.getElementById("TWGambar").value,

    }
    console.log(obj);

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Approve it!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Done!',
                'Your transaction has been Approve.',
                'success'
            ),

                $.ajax({
                    url: "https://localhost:44306/API/Transaction",
                    type: "PUT",
                    data: obj,
                    data: JSON.stringify(obj),
                    contentType: 'application/json;charset=utf-8',
                }).done((result) => {
                    $("#modalsTransactionWaiting").modal('hide');
                    $('#DataTable_transactionWaiting').DataTable().ajax.reload();

                }).fail((error) => {
                    console.log(error);
                    alert("Update Gagal");

                })
        }
    })
}

//Decline Payment
function TDEC() {

    let obj = {

        transactionId: parseInt(document.getElementById("TW_transactionId").value),
        userId: parseInt(document.getElementById("TWuserId").value),
        courseId: parseInt(document.getElementById("TWcourseId").value),
        status: 1,
        date: document.getElementById("TWdate1").value,
        bukti_pembayaran: document.getElementById("TWGambar").value,

    }
    console.log(obj);

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Decline it!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Done!',
                'Your transaction has been Decline.',
                'success'
            ),

                $.ajax({
                    url: "https://localhost:44306/API/Transaction",
                    type: "PUT",
                    data: obj,
                    data: JSON.stringify(obj),
                    contentType: 'application/json;charset=utf-8',
                }).done((result) => {
                    $("#modalsTransactionWaiting").modal('hide');
                    $('#DataTable_transactionWaiting').DataTable().ajax.reload();

                }).fail((error) => {
                    console.log(error);
                    alert("Update Gagal");

                })
        }
    })
}






/*CRUD Transaction Decline*/
//Datatables
$(document).ready(function () {
    $('#DataTable_transactionDecline').DataTable({
        language: {
            paginate: {
                next: '<i class="fas fa-angle-right">',
                previous: '<i class="fas fa-angle-left">'
            }
        },
        dom: 'lBfrtip',
        buttons: [
            //'copy', 'csv', 'excel', 'pdf', 'print'
            /*'copy', 'csv', 'excel', 'pdf', 'print'*/
            {
                extend: 'pdf', title: 'Data Master User',
                className: 'btn btn-sm btn-danger glyphicon glyphicon-file',
                text: '<i class="far fa-file-pdf"></i>',
                titleAttr: 'PDF',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5]
                }
            },
            {
                extend: 'excel', title: 'Data Master User',
                className: 'btn btn-sm btn-success  glyphicon glyphicon-list-alt',
                text: '<i class="fas fa-file-excel"></i>',
                titleAttr: 'Excel',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5]
                }
            },
            {
                extend: 'csv', title: 'Data Master User',
                className: 'btn btn-sm btn-success  glyphicon glyphicon-save-file',
                text: '<i class="fas fa-file-csv"></i>',
                titleAttr: 'CSV',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5]
                }
            },
            {
                extend: 'copy', title: 'Data Master User',
                className: 'btn btn-sm btn-warning  glyphicon glyphicon-duplicate',
                text: '<i class="far fa-copy"></i>',
                titleAttr: 'COPY',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5]
                }
            },
            {
                extend: 'print', title: 'Data Master User',
                className: 'btn btn-sm btn-dark  glyphicon glyphicon-print',
                text: '<i class="fas fa-print"></i>',
                titleAttr: 'PRINT',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5]
                }
            }
        ],
        initComplete: function () {
            var btns = $('.dt-button');
            //btns.addClass('btn btn-primary btn-sm');
            btns.removeClass('dt-button');
        },
        "ajax": {
            "url": "https://localhost:44306/API/Transaction/GetTransaction",
            "dataType": "json",
            "dataSrc": function (json) {
                return json.filter(function (item) {
                    return item.status == "Decline";
                });
            },
        },
        "columns": [
            {
                "data": null, "sortable": false,
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            {
                "data": "user"
            },
            {
                "data": "course"
            },
            {
                "data": "status"
            },
            {
                "data": "date",
                "render": function (data) {
                    var date = new Date(data);
                    var month = date.getMonth() + 1;
                    return date.getDate() + "/" + (month.length > 1 ? month : "0" + month) + "/" + date.getFullYear();
                    //    //return date;
                }
            },
            {
                "data": "transactionId",
                render: function (data, type, row, meta) {
                    return `<button type="button" class="btn btn-success btn-sm" onclick="getTransactionDecline('${data}')" data-toggle="modal" data-target="#modalsTransactionDecline">
                              <i class="fas fa-edit"></i>
                            </button>`
                }
            }
        ]

    });

})

//detail
function getTransactionDecline(data) {
    $.ajax({
        url: "https://localhost:44306/API/Transaction/GetTransaction"

    }).done((res) => {
        //let item = res.find(item => item.userId === data);
        let item = res.find(item => item.transactionId === parseInt(data));
        console.log(item);



        console.log(item.status);


        $("#TD_transactionId").attr("value", item.transactionId);

        $("#TD_userId").attr("value", item.user);
        $("#TD_courseId").attr("value", item.course);
        $("#TDUserId").attr("value", item.userId);
        $("#TDCourseId").attr("value", item.courseId);
        $("#TDGambar").html(item.bukti_Pembayaran);

        /*$("#TW_status").attr("value", res.status);*/
        if (item.status == "Accept") {
            $("#TD_status").val(0);
        }
        if (item.status == "Decline") {
            $("#TD_status").val(1);
        }
        if (item.status == "Waiting") {
            $("#TD_status").val(2);
        }
        document.getElementById("TD_date").value = moment(item.date).format("yyyy-MM-DD");
        /*$("#TW_bukti_pembayaran").attr("value", res.bukti_Pembayaran);*/


        let string = item.bukti_Pembayaran;
        $("#imgGetProofDecline").attr("src", "data:image/png;base64," + string);

    })
}

/*Update Transaction in Section Accept*/
function Tupdate() {
    let obj = {

        transactionId: parseInt(document.getElementById("TA_transactionId").value),
        userId: parseInt(document.getElementById("TAUserId").value),
        courseId: parseInt(document.getElementById("TACourseId").value),
        status: parseInt(document.getElementById("TA_statud").value),
        date: document.getElementById("TA_date").value,
        bukti_pembayaran: document.getElementById("TAGambar").value
    }

    console.log(obj)

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Update it!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Done!',
                'Your transacntion has been updated.',
                'success'
            ),

                $.ajax({
                    url: "https://localhost:44306/API/Transaction",
                    type: "PUT",
                    data: obj,
                    data: JSON.stringify(obj),
                    contentType: 'application/json;charset=utf-8',
                }).done((result) => {
                    $("#modalsTransactionAccept").modal('hide');
                    $('#DataTable_transactionAccept').DataTable().ajax.reload();

                }).fail((error) => {
                    console.log(error);
                    alert("Update Gagal");

                })
        }
    })


}


/*Update Transaction in Section Decline*/
function TDupdate() {
    let obj = {

        transactionId: parseInt(document.getElementById("TD_transactionId").value),
        userId: parseInt(document.getElementById("TDUserId").value),
        courseId: parseInt(document.getElementById("TDCourseId").value),
        status: parseInt(document.getElementById("TD_status").value),
        date: document.getElementById("TD_date").value,
        bukti_pembayaran: document.getElementById("TDGambar").value
    }

    console.log(obj)

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Update it!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Done!',
                'Your transacntion has been updated.',
                'success'
            ),

                $.ajax({
                    url: "https://localhost:44306/API/Transaction",
                    type: "PUT",
                    data: obj,
                    data: JSON.stringify(obj),
                    contentType: 'application/json;charset=utf-8',
                }).done((result) => {
                    $("#modalsTransactionDecline").modal('hide');
                    $('#DataTable_transactionDecline').DataTable().ajax.reload();

                }).fail((error) => {
                    console.log(error);
                    alert("Update Gagal");

                })
        }
    })


}






/*CRUD Transaction Accept*/
//dataTables
$(document).ready(function () {
    $('#DataTable_transactionAccept').DataTable({
        language: {
            paginate: {
                next: '<i class="fas fa-angle-right">',
                previous: '<i class="fas fa-angle-left">'
            }
        },
        dom: 'lBfrtip',
        buttons: [
            //'copy', 'csv', 'excel', 'pdf', 'print'
            /*'copy', 'csv', 'excel', 'pdf', 'print'*/
            {
                extend: 'pdf', title: 'Data Master User',
                className: 'btn btn-sm btn-danger glyphicon glyphicon-file',
                text: '<i class="far fa-file-pdf"></i>',
                titleAttr: 'PDF',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5]
                }
            },
            {
                extend: 'excel', title: 'Data Master User',
                className: 'btn btn-sm btn-success  glyphicon glyphicon-list-alt',
                text: '<i class="fas fa-file-excel"></i>',
                titleAttr: 'Excel',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5]
                }
            },
            {
                extend: 'csv', title: 'Data Master User',
                className: 'btn btn-sm btn-success  glyphicon glyphicon-save-file',
                text: '<i class="fas fa-file-csv"></i>',
                titleAttr: 'CSV',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5]
                }
            },
            {
                extend: 'copy', title: 'Data Master User',
                className: 'btn btn-sm btn-warning  glyphicon glyphicon-duplicate',
                text: '<i class="far fa-copy"></i>',
                titleAttr: 'COPY',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5]
                }
            },
            {
                extend: 'print', title: 'Data Master User',
                className: 'btn btn-sm btn-dark  glyphicon glyphicon-print',
                text: '<i class="fas fa-print"></i>',
                titleAttr: 'PRINT',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5]
                }
            }
        ],
        initComplete: function () {
            var btns = $('.dt-button');
            //btns.addClass('btn btn-primary btn-sm');
            btns.removeClass('dt-button');
        },
        "ajax": {
            "url": "https://localhost:44306/API/Transaction/GetTransaction",
            "dataType": "json",
            "dataSrc": function (json) {
                return json.filter(function (item) {
                    return item.status == "Accept";
                });
            },
        },
        "columns": [
            {
                "data": null, "sortable": false,
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            {
                "data": "user"
            },
            {
                "data": "course"
            },
            {
                "data": "status"
            },
            {
                "data": "date",
                "render": function (data) {
                    var date = new Date(data);
                    var month = date.getMonth() + 1;
                    return date.getDate() + "/" + (month.length > 1 ? month : "0" + month) + "/" + date.getFullYear();
                    //    //return date;
                }
            },
            {
                "data": "transactionId",
                render: function (data, type, row, meta) {
                    return `<button type="button" class="btn btn-success btn-sm" onclick="getTransactionAccept('${data}')" data-toggle="modal" data-target="#modalsTransactionAccept">
                              <i class="fas fa-edit"></i>
                            </button>`
                }
            }
        ]

    });

})

//detail
function getTransactionAccept(data) {
    $.ajax({
        url: "https://localhost:44306/API/Transaction/GetTransaction"

    }).done((res) => {
        //let item = res.find(item => item.userId === data);
        let item = res.find(item => item.transactionId === parseInt(data));
        console.log(item);

        if (item.status === "Accept") {
            $("#TA_statud").val(0);
        }
        if (item.status === "Decline") {
            $("#TA_statud").val(1);
        }
        if (item.status === "Waiting") {
            $("#TA_statud").val(2);
        }

        $("#TA_transactionId").attr("value", item.transactionId);

        $("#TA_userId").attr("value", item.user);
        $("#TA_courseId").attr("value", item.course);
        $("#TAUserId").attr("value", item.userId);
        $("#TACourseId").attr("value", item.courseId);
        /*$("#TW_status").attr("value", res.status);*/

        document.getElementById("TA_date").value = moment(item.date).format("yyyy-MM-DD");
        /*$("#TW_bukti_pembayaran").attr("value", res.bukti_Pembayaran);*/
        $("#TAGambar").html(item.bukti_Pembayaran);

        let string = item.bukti_Pembayaran;
        $("#imgGetProofAccept").attr("src", "data:image/png;base64," + string);

    })
}










