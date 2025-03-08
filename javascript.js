// Project start 18/2/2025
const playerMusic = document.getElementById("myAudio");
const buttonPlay = document.getElementById("play-music");
const skipNext = document.getElementById("skip_next");
const undoTheSong = document.getElementById("undo-the-song");
const repeatSong = document.getElementById("repeat");
const musicScore = document.getElementById("score-music");
const songIsPlaying = document.getElementById("list");
const playingMusic = document.querySelectorAll(".color")
const clearMusic = document.querySelectorAll(".material-icons");
const clearMusices = document.querySelectorAll(".clear");
const playMusicc = document.getElementById("playlist-music");
var i = 0;


var mang = [
    { url: "https://files.catbox.moe/jzh338.mp3", name: "Có duyên không nợ(Remix)" },
    { url: "https://files.catbox.moe/l9bys3.mp3", name: "Lỗi tại anh(Remix)" },
    { url: "https://files.catbox.moe/4qeuhx.mp3", name: "Những lời dối gian(Remix)" },
    { url: "https://files.catbox.moe/cchrlh.mp3", name: "Anh vẫn ở đây(Remix)" },
    { url: "https://files.catbox.moe/e0vra6.mp3", name: "Mỹ nhân(Remix)" },
    { url: "https://files.catbox.moe/hjslmx.mp3", name: "Khóc cho người ai khóc cho anh(Remix)" },
    { url: "https://files.catbox.moe/c111c0.mp3", name: "Đau ở đây này(Remix)" },
    { url: "https://files.catbox.moe/eikdc0.mp3", name: "Đừng hỏi em ổn không(Remix)" },
    { url: "https://files.catbox.moe/ehujgm.mp3", name: "Mắt nai cha cha cha(Remix)" },
    { url: "https://files.catbox.moe/i5r4jc.mp3", name: "Ôm sầu(Remix)" }

];

var arrayLength = mang.length;


mang.forEach(function (song, index) {
    var li = document.createElement("li"); // Tạo một thẻ <li>

    var span = document.createElement("button"); // Tạo một thẻ <button> chứa tên bài hát
    span.classList.add("color");
    span.textContent = song.name;
    span.style.backgroundColor = "";

    // Xử lý khi click vào bài hát
    span.onclick = function () {
        playMusic(mang[index].url);

        // Tìm bài hát hiện tại đang phát và xóa màu nền
        let currentPlaying = document.querySelector(".playing");
        if (currentPlaying) {
            currentPlaying.classList.remove("playing");
            currentPlaying.style.backgroundColor = ""; // Reset màu nền
            
        }

        // Đánh dấu bài hát mới đang phát
        span.classList.add("playing");
        span.style.backgroundColor = "#556b2f";
        i=index;
        // Hiển thị tên bài hát đang phát
        songIsPlaying.innerText = mang[index].name;
    };

    var deleteBtn = document.createElement("button"); // Tạo nút "Xóa"
    deleteBtn.style.color = "red";
    deleteBtn.textContent = "Xóa";

    // Gán sự kiện xóa cho nút "Xóa"
    deleteBtn.addEventListener("click", function () {
        li.remove(); // Xóa phần tử HTML

        // Cập nhật lại mảng bằng cách loại bỏ bài hát có cùng tên
        mang = mang.filter(function(item) {
            return item.name !== song.name;
        });

        playerMusic.pause();
        buttonPlay.innerHTML = '<i class="bi bi-play"></i>';
        console.log(mang);
    });

    // Thêm nội dung vào thẻ <li>
    li.appendChild(span); // Thêm tên bài hát vào <li>
    li.appendChild(deleteBtn); // Thêm nút "Xóa" vào <li>

    // Thêm <li> vào danh sách <ul>
    playMusicc.appendChild(li);
});


buttonPlay.onclick = function () {

    // i = tam;
    if (playerMusic.paused) {
        playerMusic.play();
        playMusic(mang[i].url);

        songIsPlaying.innerText = mang[i].name;
        clearMusices[i].style.backgroundColor = "#556b2f";

        buttonPlay.innerHTML = '<i class="bi bi-pause-btn"></i>';
    } else {
        playerMusic.pause();
        buttonPlay.innerHTML = '<i class="bi bi-play"></i>'; // do có thư viện Material nên không cần định nghĩa trước các thuộc tính innerHtml;
    }
};



skipNext.onclick = function () {// hàm sử lí tiến bài hát

    i++;
    songIsPlaying.innerText = mang[i].name;
    playMusic(mang[i].url);// chọn bài hát ở vị trí tương ứng để phát(phải cập nhật trạng thái bài hát trong điều kiện if này vì trạng thái ở ngoài khác với trong if)
    clearMusices[i].style.backgroundColor = "#556b2f";
    clearMusices[i - 1].style.backgroundColor = "";// khi next bài hát tiếp theo thì bài vừa xong sẽ trở lại màu bình thường
}
// // // if (tam == 0) {// điều kiện này để khi  bắt đầu chưa chọn bài hát mà bấm nút |<< sẽ bị chặn lại (nếu không chặn thì phải click nút >>| bù lại lượng click thừa ra )
// // //     undoTheSong.onclick = function () {
// // //         buttonPlay.innerHTML = '<i class="bi bi-play"></i>';
// // //     }
// // // } else {}



// // for (let n = 0; n < mang.length; n++) {
// //     if (mang[n] == "") {
// //         mang.splice(n, 1);
// //         // i--
// //         // tam4--;
// //         // songIsPlaying.innerText = mang[i].name;
// //         // playMusic(mang[i].url);// chọn bài hát ở vị trí tương ứng để phát(phải cập nhật trạng thái bài hát trong điều kiện if này vì trạng thái ở ngoài khác với trong if)
// //         // clearMusices[i].style.backgroundColor = "#556b2f";
// //         // clearMusices[i + 1].style.backgroundColor = "";// khi next bài hát tiếp theo thì bài vừa xong sẽ trở lại màu bình thường

// //     }




// // }




// undoTheSong.onclick = function () {// hàm sử lí lùi bài hát


//     // alert(tam3)


//     i-- // khi chọn bài bằng nút |<< thì tác dụng làm cho vị trí bài hát đồng bộ với nhau 

//     songIsPlaying.innerText = mang[i].name;
//     playMusic(mang[i].url);// chọn bài hát ở vị trí tương ứng để phát(phải cập nhật trạng thái bài hát trong điều kiện if này vì trạng thái ở ngoài khác với trong if)
//     clearMusices[i].style.backgroundColor = "#556b2f";
//     clearMusices[i + 1].style.backgroundColor = "";// khi next bài hát tiếp theo thì bài vừa xong sẽ trở lại màu bình thường

//     if (tam2 < 0) {
//         undoTheSong.onclick = function () {// nếu click hết đến đầu danh sách bài hát thì chặn không cho click nữa (nếu không chặn thì phải click bù lại lượng click thừa ra )

//         }

//     }
// }





// for (let k = 0; k < mang.length; k++) { // hàm xóa bài hát
//     clearMusic[k].onclick = function () {


//         // Ẩn bài hát trong giao diện

//         // clearMusices[k].style.display = "none";

//         // clearMusic[k].style.display = "none";
//         clearMusices[k].remove();
//         clearMusic[k].remove();
//         // Nếu bài hát đang phát bị xóa, dừng nhạc
//         // if (currentIndex === k) {
//         //     songIsPlaying.innerText = "";
//         //     buttonPlay.innerHTML = '<i class="bi bi-play"></i>';
//         //     playerMusic.pause();
//         // }
//         songIsPlaying.innerText = "";
//         buttonPlay.innerHTML = '<i class="bi bi-play"></i>';
//         playerMusic.pause();

//         // Xóa phần tử khỏi mảng
//         mang.splice(k, 1);

//         console.log(mang);
//         // i=k;
//         // clearMusic.splice(k, 1);
//         // clearMusices.splice(k, 1);

//         // // Cập nhật chỉ số bài hát đang phát
//         // if (currentIndex > k) {
//         //     currentIndex--; // Nếu bài trước bài đang phát bị xóa, cập nhật chỉ số
//         // } else if (currentIndex >= mang.length) {
//         //     currentIndex = 0; // Nếu xóa bài cuối, quay về bài đầu
//         // }
//     };

// }


// for (let m = 0; m < mang.length; m++) {// xử lí khi nhấn trực tiếp vào bài hát để phát 

//     playingMusic[m].onclick = function () {
//         playMusic(mang[m].url);
//         clearMusices[m].style.backgroundColor = "#556b2f";
//         songIsPlaying.innerText = mang[m].name;
//         i = m;


//     }
// }
// // mang.splice(tam3,1);



function playMusic(songname) { // hàm sử lí phát nhạc
    playerMusic.src = songname
    if (playerMusic.paused) {
        playerMusic.play();
        buttonPlay.innerHTML = '<i class="bi bi-pause-btn"></i>';

    } else {
        playerMusic.pause();
        buttonPlay.innerHTML = '<i class="bi bi-play"></i>';// do có thư viện bottrap icon nên không cần định nghĩa trước các thuộc tính innerHtml;
    }
}