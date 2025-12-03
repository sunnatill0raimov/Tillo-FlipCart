// main.js
import { startLevel } from './model/start.js'
import { db, ref, set, get, onValue } from './model/firebase.js'

document.addEventListener('DOMContentLoaded', () => {
	const levelStart = document.querySelector('.level'),
		levelNumSaidbar = document.querySelector('#levelNum'),
		bombCountSaidbar = document.querySelector('#bombCount'),
		starCountSaidbar = document.querySelector('#starCount'),
		winnersText = document.querySelector('.winners'),
		onlineText = document.querySelector('.onlinePlayer')

	let level = 0
	const maxLevel = 12
	const secureKey = 'flipcard_secret_2025'

	/* ======================
	   🔵 Firebase Online tizimi
	====================== */

	const playerId = `player_${Date.now()}`
	set(ref(db, `online/${playerId}`), { active: true, secureKey })

	// O‘yinchi chiqsa — o‘chirib tashlash
	window.addEventListener('beforeunload', () => {
		set(ref(db, `online/${playerId}`), null)
	})

	// Online o‘yinchilar soni
	onValue(ref(db, 'online'), snapshot => {
		const data = snapshot.val() || {}
		const count = Object.keys(data).length
		onlineText.textContent = `Online players: ${count}`
	})

	// Yutganlar soni
	onValue(ref(db, 'winnersCount'), snapshot => {
		const count = snapshot.val()?.value || 0
		winnersText.textContent = `Winners: ${count}`
	})

	/* ======================
	   🟢 O‘yin darajalari
	====================== */

	function loadLevel() {
		levelStart.textContent = `Level: ${level + 1}`
		levelNumSaidbar.textContent = `${level + 1}`

		const bombCount = level
		const starCount = Math.max(12 - level, 1)

		bombCountSaidbar.textContent = bombCount
		starCountSaidbar.textContent = starCount

		// Agar 12-levelni (yakuniy bosqichni) yutgan bo‘lsa
		if (level >= maxLevel) {
			const overlay = document.createElement('div')
			overlay.classList.add('game_win')
			overlay.textContent = '🎉 YOU COMPLETED ALL LEVELS 🎉'
			document.body.append(overlay)

			// ✅ Faqat yakuniy levelda Winners +1 bo‘ladi
			updateWinnerCount()

			setTimeout(() => {
				document.body.removeChild(overlay)
				level = 0 // boshidan boshlanadi
				loadLevel()
			}, 4000)
			return
		}

		startLevel(bombCount, starCount, isWin => {
			if (isWin) {
				// ❌ Har levelda emas — faqat 12-levelda qo‘shiladi
				level++
				loadLevel()
			} else {
				loadLevel()
			}
		})
	}

	// 🎯 Faqat yakuniy g‘alabada winnersCount ni oshirish
	function updateWinnerCount() {
		const winnersRef = ref(db, 'winnersCount')
		get(winnersRef).then(snapshot => {
			const current = snapshot.val()?.value || 0
			set(winnersRef, { value: current + 1, secureKey })
		})
	}

	loadLevel()
})
