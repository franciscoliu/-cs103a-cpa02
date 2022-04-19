const dynamicResume= (options, themeOptions)=>{
    return `
    <!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
        integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">

    <title>Resume maker</title>
    <style>
        .resume {
            width: 6.1in;
            height: 7.86in;
        }

        .box {
            background-color: ${themeOptions.wholeBodyColor};
            width: 100%;
            height: 100%;
        }

        .left-side {
            color: ${themeOptions.leftTextColor};
            width: 33%;
            height: 100%;
            background-color: ${themeOptions.leftBackgroundColor};

        }

        .right-side {
            height: 100%;
            width: 65%;
            color: ${themeOptions.rightTextColor};
        }

        .name {
            font-size: 1.2rem;
        }

        .profile-image {
            width: 90%;
            margin-left: 5%;
            margin-top: 3%;
        }

        .profile-image img {
            border-radius: 50%;
        }

        .heading-text {
            font-size: 1.1rem;
        }

        .para,
        .per-info {
            font-size: 0.7rem !important;
            border-collapse:collapse;
        }

        .about .para{
            width: 93%;
        }
        .key-skills li{
            font-size: 1.5rem;
        }

    </style>

</head>

<body>
    <div class="resume border shadow d-flex aligh-items-center jusify-content-center">
        <div class="box">
            <!-- SPELLING MISTAKE -->
            <div class="left-side d-inline-block">
                <div class="profile-image">
                    <img class="img-fluid" src="" alt="">
                </div>
                <div class="contact ml-2 mt-2">
                    <div class="heading-text text-uppercase">Contact</div>
                    <p class="para mb-1">
                        ${options.address} <br>
                        ${options.phone} <br>
                        ${options.email} <br>
                        github: ${options.github} <br>
                    </p>
                </div>
                <div class="expert ml-2 mt-2">
                    <div class="heading-text text-uppercase">Expertise Area</div>
                    <p class="para mb-1">
                    ${options.exp_1} <br>
                    ${options.exp_2} <br>
                    ${options.exp_3} <br>
                    </p>
                </div>

                <div class="skill ml-2 mt-2">
                    <div class="heading-text text-uppercase">IT Skill</div>
                    <p class="para mb-1">
                    ${options.skill}
                    </p>
                </div>


                <div class="Extracurricular ml-2 mt-2">
                    <div class="heading-text text-uppercase">hobbies</div>
                    <p class="para mb-1">
                        ${options.extra1}<br>
                        ${options.extra2}<br>
                        ${options.extra3}<br>
                    </p>
                </div>

                <div class="honor ml-2 mt-2">
                    <div class="heading-text text-uppercase">Honors</div>
                    <p class="para mb-1">
                        ${options.honor}
                    </p>
                </div>

                <div class="Personal_Evaluation ml-2 mt-2">
                    <div class="heading-text text-uppercase">Personal Evaluation</div>
                    <p class="para mb-1">
                        ${options.about}
                    </p>
                </div>

                <div class="language ml-2 mt-2">
                    <div class="heading-text text-uppercase">Language Skill</div>
                        <p class="para mb-1">
                            Language1: ${options.language1},
                        </p>
                        <p class="para mb-1">
                            Language1 proficiency: ${options.language1_pro}
                        </p>

                        <p class="para mb-1">
                            Language2: ${options.language2},
                        </p>
                        <p class="para mb-1">
                            Language2 proficiency: ${options.language2_pro}
                        </p>
                    </div>

                </div>


            <div class="right-side d-inline-block m-0 p-0 align-top">
                <h2 class="name text-uppercase ml-3 my-2">${options.name}</h2>

                <div class="education ml-3 mt-3">
                    <div class="heading-text text-uppercase">Education Background</div>
                    <table class="per-info">
                        <tbody>
                            <tr>
                                <th>${options.coll_name}: ${options.start} - ${options.grad} <br></th>
                            </tr>

                            <tr>
                                <td>
                                    Major 1: ${options.major} <br>
                                    Major 2: ${options.major2} <br>
                                    Current GPA: ${options.gpa} <br>
                                    Taken Course: ${options.courses} <br>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>



                <div class="per-info ml-3 mt-3">
                    <div class="heading-text text-uppercase">Internship Experience</div>
                    <ul class="pl-1">
                        <li>${options.intern1}, Position: ${options.int_position1}</li>
                        <li>${options.intern2}, Position: ${options.int_position2}</li>
                        <li>${options.intern3}, Position: ${options.int_position3}</li>
                    </ul>
                </div>

                <div class="per-info ml-3 mt-3">
                    <div class="heading-text text-uppercase">Research Experience</div>
                    <ul class="pl-1">
                        <li>${options.research1}, Position: ${options.res_position1}</li>
                        <li>${options.research2}, Position: ${options.res_position2}</li>
                        <li>${options.research3}, Position: ${options.res_position3}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!-- Optional JavaScript; choose one of the two! -->

    <!-- Option 1: jQuery and Bootstrap Bundle (includes Popper) -->
    <!-- <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script> -->

    <!-- Option 2: jQuery, Popper.js, and Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
        integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js"
        integrity="sha384-w1Q4orYjBQndcko6MimVbzY0tgp4pWB4lZ7lr30WKz0vr/aWKhXdBNmNb5D92v7s"
        crossorigin="anonymous"></script>

</body>

</html>
    `;
}



module.exports = dynamicResume ;