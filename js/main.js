'use strict';

{
  // 必要な要素の取得
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');

  // 問題の作成答えを最初に書く
  const quizSet = shuffle([
    {q: '銅が燃えると何色になる？', c: ['緑色', '赤色', '黄色']},
    {q: '金を溶かす溶液といえば？', c: ['王水', '濃硝酸', '濃硫酸']},
    {q: '日本で発見された元素は？', c: ['Nh', 'Rg', 'W']},
  ]);
  let currentNum = 0;
  let isAnswered;
  let score = 0;

  // 問題のシャッフルarrが配列を表す(フィッシャーイエーツのシャッフル)
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  // 問題が正解かどうかの判定
  function checkAnswer(li) {
    if (isAnswered) {
      return;
    }
    isAnswered = true;

    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add('correct');

    // 正解したからスコアを増やす
      score++;
    } else {
      li.classList.add('wrong');
    }

    btn.classList.remove('disabled');
  }

// クイズを表示
  function setQuiz() {
    isAnswered = false;

    question.textContent = quizSet[currentNum].q;

    while (choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }

    // 問題と選択肢の表示
    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
      });
      choices.appendChild(li);
    });

    // クイズを出し終わるとスコアを表示
    if (currentNum === quizSet.length - 1) {
      btn.textContent = 'Show Score';
    }
  }

  // 関数の呼び出し
  setQuiz();

  // 最後のスコア表示
  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled');

    // 何問中何問正解かを表示
    if (currentNum === quizSet.length - 1) {
      scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
      result.classList.remove('hidden');
    } else {
      currentNum++;
      setQuiz();
    }
  });
}