//const list_items = {};

$.ajax({
    url: "https://localhost:44306/API/Course/GetCourse",
}).done((result) => {
    console.log(result);
	let text = "";
	//let list_items = val.name;
    $.each(result, function (key, val) {
		console.log(val.name);
        text += `

            <div class="card">
            <!-- Card header -->
            <div class="card-header">
              <div class="row align-items-center">
                <div class="col-8">
                  <!-- Title -->
                  <h5 class="h3 mb-0">${val.name}</h5>
                </div>
                <div class="col-4 text-right">
                  <a href="#!" class="btn btn-sm btn-neutral">${val.topic}</a>
                </div>
              </div>
            </div>
            <!-- Card image -->
            <!-- List group -->
            <!-- Card body -->
            <div class="card-body">
              <p class="card-text mb-4">${val.description}</p>
                <a href="#" onClick="detailBuyCourse('${val.courseId}')" class="btn btn-primary" data-toggle="modal" data-target="#modalsBuyCourse">Buy Course</a>
            </div>
          </div>`
    });
    //console.log(text);
    $("#card2").html(text);

	
}).fail((error) => {
    console.log(error);
})



function detailBuyCourse(data) {
    $.ajax({
        url: "https://localhost:44306/API/Course/" + data
    }).done((item) => {
        /*let item = e.find(item => item.courseId === data)*/
        $("#UcourseId").attr("value", item.courseId);

        
        $('#DataTable_SectionTransaction').DataTable({
            "bDestroy": true,
            language: {
                paginate: {
                    next: '<i class="fas fa-angle-right">',
                    previous: '<i class="fas fa-angle-left">'
                }
            },
            "ajax": {
                "url": "https://localhost:44306/API/Section",
                "dataType": "json",
                "dataSrc": function (json) {
                    return json.filter(function (section) {
                        return section.courseId == item.courseId;
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
                    "data": "name"
                },
            ]

        });



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


function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#falseinput').attr('src', e.target.result);
            $('#base').val(/base64,(.+)/.exec(e.target.result)[1]);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

//Insert
$("#form_AddTransaction").submit(function (e) {
    e.preventDefault();
    var obj = new Object(); //sesuaikan sendiri nama objectnya dan beserta isinya
    //ini ngambil value dari tiap inputan di form nya
    //var idd = $("#UuserId").val();
    //console.log(idd);
    //obj.userId = $("#UuserId").val();
    obj.userId = parseInt($("#UuserId").val());
    obj.courseId = parseInt($("#UcourseId").val());
    obj.status = 2;
    var tgl = new Date().toLocaleString();
    obj.date = moment(tgl).format();  
    obj.bukti_pembayaran = $("#base").val();
    console.log(obj);

    if (obj.bukti_pembayaran == "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to make payment !',
        })
    } else {
        $.ajax({
            url: ("https://localhost:44306/API/Transaction"),
            //type: "POST",
            //contentType: "application/json",
            //data: JSON.stringify(obj) //jika terkena 415 unsupported media type (tambahkan headertype Json & JSON.Stringify(obj);)
        }).done((result) => {
            let item = result.find(item => item.courseId === parseInt($("#UcourseId").val()) && item.userId === parseInt($("#UuserId").val()));
            //console.log(item)

            if (item == null) {
                //BELUM DIBELI
                //Swal.fire({
                //    icon: 'success',
                //    title: 'Belum di beli',
                //})
                //document.getElementById("form_AddTransaction").reset();
                //$("#modalsBuyCourse").modal('hide');

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
                            url: ("https://localhost:44306/API/Transaction"),
                            type: "POST",
                            contentType: "application/json",
                            data: JSON.stringify(obj) //jika terkena 415 unsupported media type (tambahkan headertype Json & JSON.Stringify(obj);)
                        }).done((result) => {
                            document.getElementById("form_AddTransaction").reset();
                            $("#modalsBuyCourse").modal('hide');
                            Swal.fire({
                                icon: 'success',
                                title: 'Proof of payment has been uploaded successfully',
                            })
                            $("#form_addTransaction").attr("class", "needs-validation");
                        }).fail((error) => {
                            console.log(error)
                        })
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
            } else {
                console.log(item)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Course already purchased',
                })
                document.getElementById("form_AddTransaction").reset();
                $("#modalsBuyCourse").modal('hide');
            }
            
        }).fail((error) => {
            console.log(error)
        })
      
    }
})


/*FILTER DI LANDINGPAGE*/
$.ajax({
    url: "https://localhost:44306/API/Topic",
    context: document.body
}).done((result) => {
    console.log(result);
    let text = "";


    $.each(result, function (key, val) {
        var namatopic = val.name;
        var change = namatopic.replace(/\s/g, '');
        text += `<li><a href="#" data-filter=".${change}" id="${change}" >${val.name}</a></li>`;

    });
    console.log(text);
    var gabung = `<li class="activeFilter"><a href="#" data-filter="*">Show All</a></li>` + text
    $("#menuIndra").html(gabung);

}).fail((error) => {
    console.log(error);
});


$.ajax({
    url: "https://localhost:44306/API/Course/GetCourse",
    context: document.body
}).done((ress) => {

    let articleall = "";
    $.each(ress, function (key, val) {

        var namatopic2 = val.topic;
        var change2 = namatopic2.replace(/\s/g, '');

        console.log(change2)

        articleall += `<article class="portfolio-item pf-uielements ${change2}" >
                        <div class="portfolio-image">
                            <a href="portfolio-single.html">
                                <div backgroundColor="red"></div>
                            </a>
                        </div>
                        <div class="portfolio-desc">
                            <h3>${val.name}</h3>
                            <span>${val.topic}</span>
                        </div>
                    </article>`;
    })

    $("#portfolio").html(articleall);
});

/*Data Total Transaction*/
$.ajax({
    url: "https://localhost:44306/API/Transaction/GetTransaction"
}).done((item) => {
    $("#totalTransactions").attr("data-to", item.length);
    console.log(item.length);
})

/*Data Total Topics*/
$.ajax({
    url: "https://localhost:44306/API/Topic"
}).done((item) => {
    $("#totalTopics").attr("data-to", item.length);
    console.log(item.length);
})

/*Data Total Courses*/
$.ajax({
    url: "https://localhost:44306/API/Courses"
}).done((item) => {
    $("#totalCourses").attr("data-to", item.length);
    console.log(item.length);
})

/*Data Total Users*/
$.ajax({
    url: "https://localhost:44306/API/User"
}).done((item) => {
    $("#totalUsers").attr("data-to", item.length);
    console.log(item.length);
})






