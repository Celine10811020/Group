function Group() {
  const inputName = document.getElementById('names');
  const inputNumber = document.getElementById('number');
  const resultsDiv = document.getElementById('results');

  const names = inputName.value.trim().split('\n').filter(name => name.trim() !== '');
  const minGroupSize = parseInt(inputNumber.value);

  shuffleArray(names);

  const totalPeople = names.length;
  const numGroups = Math.floor(totalPeople / minGroupSize);
  const extraMembers = totalPeople % minGroupSize;

  const groups = [];
  let nameIndex = 0;

  for (let i = 0; i < numGroups; i++) {
    const currentGroupSize = minGroupSize + (i < extraMembers ? 1 : 0);
    groups.push(names.slice(nameIndex, nameIndex + currentGroupSize));
    nameIndex += currentGroupSize;
  }

  const groupNumbers = generateRandomGroupNumbers(groups.length);

  resultsDiv.innerHTML = '';
  groups.forEach((group, index) => {
    const groupDiv = document.createElement('div');
    groupDiv.classList.add('group');
    groupDiv.innerHTML = `<strong>第 ${groupNumbers[index]} 組：</strong><br>${group.join('<br>')}`;
    resultsDiv.appendChild(groupDiv);
  });
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function generateRandomGroupNumbers(numGroups) {
  const availableNumbers = Array.from({ length: 8 }, (_, i) => i + 1);
  shuffleArray(availableNumbers);
  return availableNumbers.slice(0, numGroups);
}
