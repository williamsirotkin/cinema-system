Run the app doing ./run.sh

If you get a permission error runnning it, do chmod 777 run.sh in terminal


order json: 
{
	“total”: 34.45, # total not including promotion
	“movie”: {name: “Superbad”, room: “room_one”, showtime: “2023-04-05T18:00:00.000+00:00”},
	“seats”: [{seatNumber: 14, seatType: “Child”}, {seatNumber: 15, seatType: “Adult”}],
	“promoApplied”: “PercentTest”,  # the name of the promotion applied, empty string if no promo was applied
	“promoValue”: 10.99 # Amount promotion takes off total, doesn’t matter if its percent or dollar amount, 0 if no promo
	“email”: “williamsirotkin@gmail.com,
}
