// Project start 18/2/2025
const buttonReset = document.getElementById("reset");
const playerMusic = document.getElementById("myAudio");
const buttonPlay = document.getElementById("play-music");
const skipNext = document.getElementById("skip_next");
const undoTheSong = document.getElementById("undo-the-song");
const repeatSong = document.getElementById("repeat");

const songIsPlaying = document.getElementById("list");

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

var newArray = [...mang];

var newArray1;


mang.forEach(function (song) {
    var li = document.createElement("li"); // Tạo một thẻ <li>

    var span = document.createElement("button"); // Tạo một thẻ <button> chứa tên bài hát
    span.classList.add("color");
    span.textContent = song.name;
    span.style.backgroundColor = "";

    // Xử lý khi click vào bài hát
    span.onclick = function () {
        playMusic(song.url);

        // Tìm bài hát hiện tại đang phát và xóa màu nền
        let currentPlaying = document.querySelector(".playing");
        if (currentPlaying) {
            currentPlaying.classList.remove("playing");
            currentPlaying.style.backgroundColor = ""; // Reset màu nền
        }

        // Đánh dấu bài hát mới đang phát
        span.classList.add("playing");
        span.style.backgroundColor = "#556b2f";
        i = mang.findIndex(item => item.name === song.name); // Đánh dấu vị trí bài hát đang phát

        songIsPlaying.innerText = song.name;
    };

    var deleteBtn = document.createElement("button"); // Tạo nút "Xóa"
    deleteBtn.style.color = "red";
    deleteBtn.textContent = "Xóa";

    // Gán sự kiện xóa cho nút "Xóa"
    deleteBtn.addEventListener("click", function () {
        deleteMusic(mang, song.name, li);
    });

    // Thêm nội dung vào thẻ <li>
    li.appendChild(span); // Thêm tên bài hát vào <li>
    li.appendChild(deleteBtn); // Thêm nút "Xóa" vào <li>

    // Thêm <li> vào danh sách <ul>
    playMusicc.appendChild(li);
});

// Hàm xóa bài hát
function deleteMusic(mang, songName, li) {

    // Xóa phần tử HTML khỏi danh sách
    li.remove();

    // Cập nhật lại mảng bằng cách loại bỏ bài hát có tên tương ứng
    let newMang = mang.filter(item => item.name !== songName);
    mang.length = 0; // Xóa tất cả phần tử của mảng cũ
    newMang.forEach(item => mang.push(item)); // Cập nhật lại mảng ban đầu



    if (mang.length === 0) {// Nếu danh sách trống, thêm nút reset


        let resetListMusic = document.createElement("button");
        resetListMusic.textContent = "reset";
        resetListMusic.style.color = "red";
        buttonReset.appendChild(resetListMusic);

        // Khi nhấn reset, khôi phục danh sách bài hát
        resetListMusic.onclick = function () {
            newArray1 = [...newArray]

            playMusicc.innerHTML = newArray1.map(song =>
                `<li>
                    <button onclick="
                        playMusic('${song.url}'); 
                        songIsPlaying.innerText='${song.name}';
            
                        let currentPlaying = document.querySelector('.playing');
                        if (currentPlaying) {
                            currentPlaying.classList.remove('playing');
                            currentPlaying.style.backgroundColor = ''; // Reset màu nền
                        }
            
                        let span = this.querySelector('span'); // Lấy phần tử <span> trong nút
                        span.classList.add('playing');
                        span.style.backgroundColor = '#556b2f';
            
                        i = newArray1.findIndex(item => item.name === '${song.name}'); // Đánh dấu vị trí bài hát đang phát
                    ">
                        <span class="color">${song.name}</span>
                    </button>
                    <button style="color: red;" onclick="deleteMusic(newArray1, '${song.name}', this.parentElement)">
                        xóa
                    </button>
                </li>`
            ).join("");
            songIsPlaying.innerText = "";
            skipMusic(newArray1);
            undoTheMusic(newArray1);
            repeatMusic(newArray1);
            resetListMusic.remove(); // Xóa nút reset sau khi nhấn
        };
    }

    // Dừng nhạc nếu bài hát bị xóa
    playerMusic.pause();
    buttonPlay.innerHTML = '<i class="bi bi-play"></i>';
}



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



function skipMusic(mang) {


    skipNext.onclick = function () {// hàm sử lí tiến bài hát
        if (i + 1 >= mang.length) {// nếu click vượt quá danh sách bài hát thì chặn bị trùng lặp
            return;

        } else {
            i++;
            const playingMusic = document.querySelectorAll(".color")//sau khi xóa đi bài hát trên danh sách phát thì lấy lại danh sách bài hát đã được cập nhật


            songIsPlaying.innerText = mang[i].name;
            playMusic(mang[i].url);// chọn bài hát ở vị trí tương ứng để phát(phải cập nhật trạng thái bài hát trong điều kiện if này vì trạng thái ở ngoài khác với trong if)
            let currentPlayingg = document.querySelector(".playing");
            if (currentPlayingg) {
                currentPlayingg.classList.remove("playing");
                currentPlayingg.style.backgroundColor = ""; // Reset màu nền

            }
            playingMusic[i].classList.add("playing");
            playingMusic[i].style.backgroundColor = "#556b2f";

        }



    }
}
skipMusic(mang);

function undoTheMusic(mang) {


    undoTheSong.onclick = function () {// hàm sử lí lùi bài hát
        if (i - 1 < 0) {
            return;
        }
        const playingMusic = document.querySelectorAll(".color")//sau khi xóa đi bài hát trên danh sách phát thì lấy lại danh sách bài hát đã được cập nhật

        i-- // khi chọn bài bằng nút |<< thì tác dụng làm cho vị trí bài hát đồng bộ với nhau 

        songIsPlaying.innerText = mang[i].name;
        playMusic(mang[i].url);// chọn bài hát ở vị trí tương ứng để phát(phải cập nhật trạng thái bài hát trong điều kiện if này vì trạng thái ở ngoài khác với trong if)
        let currentPlayingg = document.querySelector(".playing");
        if (currentPlayingg) {
            currentPlayingg.classList.remove("playing");
            currentPlayingg.style.backgroundColor = ""; // Reset màu nền

        }

        // Đánh dấu bài hát mới đang phát
        playingMusic[i].classList.add("playing");
        playingMusic[i].style.backgroundColor = "#556b2f";
    }
}
undoTheMusic(mang);
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
function repeatMusic(mang) {


    repeatSong.onclick = function randomSong() {
        mang.sort(() => Math.random() - 0.5);
        playMusicc.innerHTML = mang.map(song =>
            `<li>
            <button onclick="
                playMusic('${song.url}'); 
                songIsPlaying.innerText='${song.name}';
    
                let currentPlaying = document.querySelector('.playing');
                if (currentPlaying) {
                    currentPlaying.classList.remove('playing');
                    currentPlaying.style.backgroundColor = ''; // Reset màu nền
                }
    
                let span = this.querySelector('span'); // Lấy phần tử <span> trong nút
                span.classList.add('playing');
                span.style.backgroundColor = '#556b2f';
    
                i = mang.findIndex(item => item.name === '${song.name}'); // Đánh dấu vị trí bài hát đang phát
            ">
                <span class="color">${song.name}</span>
            </button>
            <button style="color: red;" onclick="deleteMusic(mang, '${song.name}', this.parentElement)">
                xóa
            </button>
        </li>`
        ).join("");
        skipMusic(mang);
        undoTheMusic(mang);
        playerMusic.pause();
        songIsPlaying.innerText = "";
        resetListMusic.remove(); // Xóa nút reset sau khi nhấn
    }
}
repeatMusic(mang)