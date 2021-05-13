const localData = {
	appName: "DC",
	game: {
		name: "Doge Lucky Picker",
		instruction: {
			title: "Instructions",
			inGameTitle: "Pick a card",
			p1:
				"Hi, find the Doge hidden behind the cards below. ",
			p2:
				"Out of 10 chances; 6 or more correct picks wins. 1 point for every correct pick. Good luck!",
		},
		chanceLimit: 10,
		passLimit: 6,
		optionLimit: 4,
		themes: [
			{
				character: "Doge Coin",
				images: [
					{
						src: "/dogecoin.png",
						width: "150",
						height: "150",
						alt: "Doge coin logo",
					},
					{
						src: "/dogey.jpg",
						width: "150",
						height: "150",
						alt: "Doge",
					},
				],
			},
		],
	},
}

export default localData
