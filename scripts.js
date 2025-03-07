document.addEventListener("DOMContentLoaded", function () { 
  console.log("DOMContentLoaded event fired!");

  // 検索ボタンの設定
  const searchButton = document.getElementById("searchButton");
  if (!searchButton) {
    console.warn("searchButtonが見つかりません（このページには無い可能性あり）");
  } else {
    searchButton.addEventListener("click", filterScripts);
  }

  // JSONデータを取得して表示
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      scripts = data;
      
      // scriptList があるページだけ displayScripts を実行する
      const scriptList = document.getElementById("scriptList");
      if (scriptList) {
        displayScripts(scripts);
      } else {
        console.warn("scriptListが見つかりません（このページには表示するリストがない可能性あり）");
      }
    })
    .catch((error) => console.error("データの読み込みに失敗しました:", error));
});


// 脚本一覧を表示する関数
function displayScripts(scriptList) {
  const scriptContainer = document.getElementById("scriptList"); // 修正
  
  scriptContainer.innerHTML = ""; // 一度クリア

  scriptList.forEach((script) => {
    const scriptElement = document.createElement("div");
    scriptElement.classList.add("script-item");
    scriptElement.innerHTML = `
      <h3><a href="scripts.html?id=${script.id}">${script.title}</a></h3>
      <p>ジャンル: ${script.genre} | 時間: ${script.time}分</p>
      <p>男性: ${script.male}人 | 女性: ${script.female}人 | 合計: ${script.cast}人</p>
    `;
    scriptContainer.appendChild(scriptElement);
  });
}


// 検索＆フィルタリング処理
function filterScripts() {
  const timeFilter = document.getElementById("timeFilter").value; // 修正
  const maleFilter = document.getElementById("maleFilter").value;
  const femaleFilter = document.getElementById("femaleFilter").value;
  const genreFilter = document.getElementById("genreFilter").value;
  const castFilter = document.getElementById("castFilter").value;

  if (!scripts) {
    console.error("scriptsが未定義です");
    return;
  }

  const filteredScripts = scripts.filter((script) => {
    return (
      (timeFilter === "" || script.time <= parseInt(timeFilter)) &&
      (maleFilter === "" || script.male === parseInt(maleFilter)) &&
      (femaleFilter === "" || script.female === parseInt(femaleFilter)) &&
      (genreFilter === "" || script.genre === genreFilter) &&
      (castFilter === "" || script.cast <= parseInt(castFilter))
    );
  });
// scripts.html で個別の脚本を表示する処理
  displayScripts(filteredScripts);
}

 // 並べ替え処理
 const sortOrder = document.getElementById("sortOrder");
 if (sortOrder) {
   sortOrder.addEventListener("change", function () {
     if (!scripts) return;
     const sortOrderValue = sortOrder.value;
     scripts.sort((a, b) => (sortOrderValue === "asc" ? a.time - b.time : b.time - a.time));
     displayScripts(scripts);
   });
 } else {
   console.warn("sortOrderが見つかりません（このページには無い可能性あり）");
 }


document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.includes("scripts.html")) {
    const params = new URLSearchParams(window.location.search);
    const scriptId = params.get("id");

    if (!scriptId) {
      console.error("脚本IDが指定されていません");
      return;
    }

    fetch("data.json")
      .then((response) => response.json())
      .then((data) => {
        const script = data.find((s) => s.id == scriptId);
        if (!script) {
          console.error("該当する脚本が見つかりません");
          return;
        }

        const titleElement = document.getElementById("scriptTitle");
        const genreElement = document.getElementById("scriptGenre");
        const timeElement = document.getElementById("scriptTime");
        const castElement = document.getElementById("scriptCast");
        const contentElement = document.getElementById("scriptContent");

        if (!titleElement || !genreElement || !timeElement || !castElement || !contentElement) {
          console.error("scripts.html の HTML構造が間違っている可能性があります");
          return;
        }

        titleElement.textContent = script.title;
        genreElement.textContent = `ジャンル: ${script.genre}`;
        timeElement.textContent = `時間: ${script.time}分`;
        castElement.textContent = `男性: ${script.male}人 / 女性: ${script.female}人 / 合計: ${script.cast}人`;
        contentElement.textContent = script.content;
      })
      .catch((error) => console.error("データの読み込みに失敗しました:", error));
  }
});
