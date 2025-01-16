let L= true;
search();

var md = window.markdownit();

function search() {
    if ($('.text').val() != ""||L) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify({
            "contents": [
                {
                    "parts": [
                        {
                            "text": `${L==true?"Hello":$(".text").val()}`
                        }
                    ]
                }
            ]
        });

        addChat(true, null);

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDrleMTpCDxfAcImAuvvYP2p4S_-iVIgWU", requestOptions)
            .then((response) => response.json())
            .then((res) => {
                addChat(false, res);
            });
    }
}

function addChat(Lc, res) {   
    if (Lc) {
        if (!L) {          
            $('.c').append(
                `<div class="me" data-aos="zoom-in">
                    <p class="animate__animated animate__headShake" >${$('.text').val()}&nbsp;</p>
                    
                </div>
                <br>
                `  
            );
        }
        $('.text').val("");
    } else {
        $('.c').append(
            `<div class="bot" data-aos="zoom-in">
                <p class="animate__animated animate__headShake">${md.render(res.candidates[0].content.parts[0].text)}</p>               
            </div>
            <br>
            `
        );
        L=false;
    }   
}