document.addEventListener("DOMContentLoaded", function () {
    // URLから `id` を取得する
    const urlParams = new URLSearchParams(window.location.search);
    const scriptId = urlParams.get("id");
  
    if (!scriptId) {
      document.getElementById("script-content").innerHTML = "<p>脚本が見つかりません</p>";
      return;
    }
  
    // `data.json` を取得して、対応する `id` の脚本を探す
    fetch("data.json")
      .then(response => response.json())
      .then(data => {
        const script = data.find(item => item.id == scriptId);
        
        if (!script) {
          document.getElementById("script-content").innerHTML = "<p>脚本が見つかりません</p>";
          return;
        }
  
        // HTMLにデータをセットする
        document.getElementById("script-title").textContent = script.title;
        document.getElementById("script-details").innerHTML = `
          <p>ジャンル: ${script.genre} | 時間: ${script.time}分</p>
          <p>男性: ${script.male}人 | 女性: ${script.female}人 | 合計: ${script.cast}人</p>
          <h4>内容:</h4>
          <p>${script.content}</p>
        `;
      })
      .catch(error => console.error("データの取得に失敗しました:", error));
  });
  
