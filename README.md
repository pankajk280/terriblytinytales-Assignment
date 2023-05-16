# terriblytinytales-Assignment
This project is done with respect to the assignment provided by Terribly Tiny Tales for the campus placement.

In this project there is a functional component in App.js - which has all the required different components of the webpage.
App.js contains one functional component namely WordFrequencyAnalyzer a <button> as a element which depicts "Submit button" upon clicking it 
we will get a histogram which is fetched from the given api by terriblytinytales team . So this chart is also rendered inside WordFrequencyAnalyzer Component.
Button has a onSubmit listener and when we click on it , it call the fetchData function which will fetch data and it will sort out the top 20 words and setData to the histogram .
Then we also have another button and when we click on it, it will call handleExport function which will firstly convert the chartData to text/csv and then store that in csv format and then it will start downloading on our systems.
We also have another components as "CustomBar" which is used to define the shape and size of bar and other one is "LabelPositioned" which is used to position the labels on the bar like count of frequencies on each bar

In this project I have used following libraries:-
1. Bootstrap - for styling and making the webpage responsive
2. recharts - for making histogram
3. axios - for fetching data from api
This website is currently deployed on the link : https://ttt-frequencycount.onrender.com/
