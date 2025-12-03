// start.js
export const startLevel = (bombCount, starCount, onEnd) => {
	const gameContainer = document.querySelector('.game_container')
	gameContainer.innerHTML = ''

	const cardsList = []
	const bombSound = new Audio('./sounds/chingiz_overr.mp3')
	const starSound = new Audio('./sounds/snegers.mp3')
	const winSound = new Audio('./sounds/7075_win.mp3')

	let countSoundBomb = 0
	let countSoundStar = 0

	// Bombalar
	for (let i = 0; i < bombCount; i++) {
		cardsList.push({ type: 'bomb', img: './img/bomb-Photoroom.png' })
	}

	// Yulduzchalar
	for (let i = 0; i < starCount; i++) {
		cardsList.push({ type: 'star', img: './img/star-Photoroom.png' })
	}

	// Random aralashtirish
	const randomCard = cardsList.sort(() => Math.random() - 0.5)

	randomCard.forEach(cardImg => {
		const card = document.createElement('div')
		card.classList.add('card')
		card.innerHTML = `
			<div class="card_inner">
				<div class="card_front"></div>
				<div class="card_back">
					<img src="${cardImg.img}" alt="${cardImg.type}">
				</div>
			</div>
		`

		card.addEventListener('click', () => {
			if (card.classList.contains('clicked')) return
			card.classList.add('clicked')

			card.querySelector('.card_inner').style.transform = 'rotateY(180deg)'

			if (cardImg.type === 'bomb') {
				bombSound.cloneNode(true).play()
				countSoundBomb++
				if (countSoundBomb >= 1) {
					gameEnd('game_over', 'GAME OVER 💣', bombSound, false)
				}
			} else {
				countSoundStar++
				if (countSoundStar < starCount) {
					starSound.cloneNode(true).play()
				} else {
					winSound.play()
					gameEnd('game_win', 'You win! 🏆', winSound, true)
				}
			}
		})

		gameContainer.append(card)
	})

	function gameEnd(className, message, sound, isWin) {
		const overlay = document.createElement('div')
		overlay.classList.add(className)
		overlay.textContent = message
		document.body.append(overlay)
		sound.play()

		setTimeout(() => {
			document.body.removeChild(overlay)
			gameContainer.innerHTML = ''
			onEnd(isWin)
		}, 3000)
	}
}
