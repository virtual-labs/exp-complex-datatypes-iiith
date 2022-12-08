### Link your theory in here
In this experiment we are going to learn about complex data types in python, using Sanjay's real world examples.

|<p>1.</p><p>![](Aspose.Words.93fbe191-621d-44c4-913b-e200181c917b.001.png)</p>|<p>2.</p><p>![](Aspose.Words.93fbe191-621d-44c4-913b-e200181c917b.002.png)</p>|<p>3.</p><p>![](Aspose.Words.93fbe191-621d-44c4-913b-e200181c917b.003.png)</p>|
| :- | :- | :- |
|<p>4.</p><p>![](Aspose.Words.93fbe191-621d-44c4-913b-e200181c917b.004.png)</p>|<p>5.</p><p>![](Aspose.Words.93fbe191-621d-44c4-913b-e200181c917b.005.png)</p>|<p>6.</p><p>![](Aspose.Words.93fbe191-621d-44c4-913b-e200181c917b.006.png)</p>|

Image 1. Represents that sanjay is a 2nd year engineering student, as a part of his coursework, he was learning a subject known as “python programming”, one day while attending python programming class, the professor asked the entire class to create a railway management program by utilising all the complex data types which are available in python and demonstrate the working of the program in the document, this was a part of their assignment which carries maximum weightage. 

Image 2. As Sanjay was absent during the lectures where the professor had taught complex data types in python, he starts panicking but decides to learn complex data types all by himself by taking help from the internet.

In this article, we are going to understand 3 complex data types in python i.e  lists, tuples and dictionaries.

**Let us first try to understand what are lists in python?**

- Lists are one example of a built in data types which are available in python , the other built in datatypes which are available in python are Tuple, Set, Dictionary all can be used based on client requirements.
- Python lists are mutable i.e we can modify the list elements even after the creation of list
- One can store different types of collections in a list i.e it is possible to store elements of different data types(string, integer,float etc) inside a single list. 
- For eg: you want to store individual college student  details such as his/her name, roll no, stream, family income etc then at this point of time you can use list , because if you observe carefully there are different data types involved in the above scenario i.e student name(string) , roll no(integer) , stream(string), family income(double).
- The items under lists must be comma separated and must be enclosed under square[] brackets 

**How to create a list in python?**

- List in python can be created using square brackets i.e []
- We may define a python list as shown in the below example to store individual student details such as  his/her name, roll no, stream, family income etc

karthik\_details=['karthik',1004,'computer science',200000.00]

- ` `In the above example we have defined a list named ‘karthik\_details’ along with his general(name, roll no,stream) as well as personal information(family annual income)    

**How to access a list element ?**

There are different ways from which elements can be accessed from the list 

***Method 1:Access elements of a list by using index operator*** 

- Elements in the list can be accessed using index [] operator
- List indices in python always starts from 0
- Consider the below given list


|**List Attributes:**|Name|Roll no|Stream|Family annual income|
| :- | :- | :- | :- | :- |
|**List Elements:**|<p>Karthik</p><p></p>|<p>1004</p><p></p>|<p>Computer science</p><p></p>|<p>200000.00</p><p></p>|
|**List Index:**|[0]|[1]|[2]|[3]|

Table 1.1 

- The above list has 4 items , so a list having 4 items will have indices which starts from 0 and ends at 3.
- To access the first element present in the list the syntax is as follows:

**print(karthik\_details[0])**

**o/p: karthik** 

- When you try to access indices which are not present in the list, it will raise an IndexError as represented below:

**print(karthik_details[4])**
```.py
\---------------------------------------------------------------------------

IndexError                                Traceback (most recent call last)

<ipython-input-4-a60177b535e6> in <module>

----> 1 print(karthik_details[4])

IndexError: list index out of range
```
Method 2: ***Accessing elements of the list by using negative indices***

- Python List also provides the facility of accessing elements of the list by using negative indexing.
- Observe the below given list 


|**List Attributes:**|**Name**|**Roll no**|**Stream**|**Family annual income**|
| :- | :- | :- | :- | :- |
|**List Elements:**|<p>Karthik</p><p></p>|<p>1004</p><p></p>|<p>Computer science</p><p></p>|<p>200000.00</p><p></p>|
|**List Index:**|[0]|[1]|[2]|[3]|
|**Negative Index:**|-4|-3|-2|-1|

Table 1.2

- -1 index refers to the last element present in the list, -2 index refers to the second last element present in the list and so on.
- To access the last element present in the list using negative indices , the syntax is given below:

**print(karthik\_details[-1])**

o/p: 200000.0

**Python List append()**

- The append() method is used to add an element to the end of the list. 
- For example in the above mentioned list named as karthik\_details, you wish to insert student mother name , at that point of time you utilise append() method available in python
- The syntax for append() method is as follows:

list\_name.append(item)

- If you want to append student mother name(string) to the end of the list, then the command would be karthik\_details.append(‘selvi’)
- The updated list would be as follows:



|**List Attributes:**|**Name**|**Roll no**|**Stream**|**Family annual income**|**Mother name**|
| :- | :- | :- | :- | :- | :- |
|**List Elements:**|<p>Karthik</p><p></p>|<p>1004</p><p></p>|<p>Computer science</p><p></p>|<p>200000.00</p><p></p>|selvi|
|**List Index:**|[0]|[1]|[2]|[3]|[4]|
|**Negative Index:**|-5|-4|-3|-2|-1|
          
Table 1.3                        

` `**Python list extend()**

- The extend() method in python is utilised when there is a requirement to add the specified list element to the end of the current list
- For example you have 2 lists as follows:
- The below given list consists of details from a list named karthik\_details 
- karthik\_details=[‘karthik’,1004,’computer science’,200000.00,’selvi’] The below given list consists of details from a list named  karthik\_hobbie

|**List Attribute:**|Hobbie|
| :- | :- |
|**List Element:**|reading|
|**List Index:**|0|
|**Negative Index:**|-1|

Table 1.4

- karthik\_hobbie=[‘reading’].This list stores only the hobby of student named ‘karthik’
- Now you want to add all the details present in karthik\_hobbie list to karthik\_details list and you want to convert both the lists into a single list.
- To do the above mentioned task you utilize the **extend()** method available in python. I.e **karthik\_details.extend(karthik\_hobbie)**
- The newly updated list would be as follows:


|**List Attributes:**|**Name**|**Roll no**|**Stream**|**Family annual income**|**Mother name**|**Hobbie**|
| :- | :- | :- | :- | :- | :- | :- |
|**List Elements:**|<p>Karthik</p><p></p>|<p>1004</p><p></p>|<p>Computer science</p><p></p>|<p>200000.00</p><p></p>|selvi|reading|
|**List Index:**|[0]|[1]|[2]|[3]|[4]|[5]|
|**Negative Index:**|-6|-5|-4|-3|-2|-1|

Table 1.5

- In the above table we can observe that 2 lists got converted into a single list.                 

**Python list pop()**

- The pop() method is used to remove an item from the specified index in a list and it returns the item which has been removed
- The syntax for pop() method is **list.pop(index)**
- Observe the list displayed in table 1.5, **karthik\_details.pop(0)**, will return ‘karthik’ because name of the student→ karthik is stored in 0th index , **karthik\_details.pop(-1)** , will return ‘reading’ because student hobby→ reading is stored in index -1.

**Python list reverse()**

- The reverse() method is used to reverse the list elements.
- The syntax for reverse() method is **list.reverse()**
- Observe the list displayed in table 1.5, **karthik\_details.reverse()** will display the list elements in reversed order i.e **['reading', 'selvi', 200000.0, 'computer science', 1004, 'karthik']**

**Python list remove()**

- The remove() method is used to remove the first matching element from the list
- The syntax for the remove method is **list.remove(element)**
- If the element which you have mentioned does not exists in the list, it will return an ValueError 
- Observe the list displayed in table 1.5, karthik\_details.remove(1004), will result in 1004 element getting removed from the list

**Python list sort()**

- The sort() method is used to sort the elements in list
- The syntax for sort method is **list.sort(reverse=True/False) ,** the reverse parameter is optional.
- **list.sort(reverse=True)**, will sort the list in descending order, otherwise it will sort the list in ascending order.
- Suppose that you have an list of alphabets i.e alpha=[‘b’,’d’,’c’,’a’,’f’,’e’], alpha.sort(), will display the output as ['a', 'b', 'c', 'd', 'e', 'f'] , alpha.sort(reverse=True) will display the output as ['f', 'e', 'd', 'c', 'b', 'a']


**What are tuples in python?**

- Tuples are similar to list, the only difference between tuples and list are , tuples are immutable i.e we will not be able to change the elements of a tuple once assigned, whereas lists are mutable i.e we will be able to change the elements present in the list .

**How to create tuples?**

- We can create a tuple by placing all the elements inside a round parenthesis () separated by comma
- Tuple may contain items from different data types i.e string, float, integer, double etc
- If you want to modify a tuple, you need to convert the tuple into a list, modify the list and again convert the list back into the tuple.

**Python tuple len()** 

- If you want to determine number of elements present inside a tuple, use len() function
- Lets create a tuple which will consists of some college names i.e **college=(‘NMIMS’,’IIIT’,’IIT’,’NIT’)**
- Now, if you want to check the total number of elements present inside a college tuple, we utilize the len() function. 
- **len(college)** will return the output as 4, because there are 4 elements present inside a college tuple.

**Python tuple Slicing(:)**

- In order to access a range of elements from a tuple , use the slicing operator colon (:)
- **college[1:3]**, will return tuple elements from index 1 to index 2 . The output will be IIIT , IIT
- **college[-1]** will return tuple elements from backwards of the list. The output will be NIT

**Python tuple count()** 

- In order to determine the number of times a specified value appears in a tuple, we can use the count() method.
- For eg: you have a tuple of numbers i.e **numbers=(1,2,2,3,4,5,6,7,7,7)**
- numbers.count(7) will return the output as 3, because there are 3 elements of number 7 present inside the tuple

**Python tuple index()**

- The index() method is used to determine the first occurrence of the specified value
- If the specified value is not found, then it raises an exception
- **numbers=(1,2,2,3,4,5,6,7,7,7)** , numbers.index(2) will return the output as 1 because the first occurrence of 2 is present in index 1.

**What are dictionaries in python?**

- Dictionaries store data in key:value format
- Dictionaries are defined using curly brackets {} , and they consists of keys and values
- A dictionary can be referred to as a ordered collection which is changeable and it does not allows duplicates
- Dictionaries can be modified i.e we can change, add, remove items even after the dictionary is created
- We cannot have 2 items in the dictionary with the same key
- Let us consider a dictionary named college having the following keys and values. **college={"name":"IIIT","location":"hyderabad","rank":62,"category":"autonomous"}**
- In the above dictionary name, location, rank & category are keys and IIIT,hyderabad, 62, autonomous are its corresponding values.

**Python dictionary get()**

- The get() method is used to return the value of the specified key
- The syntax for get() method is **dictionary\_name.get(keyname,value)** → keyname is mandatory, value is optional
- college.get(“name”) will return IIIT , because we are trying to find what is the value for the key name inside college dictionary

**Python dictionary keys()**

- The output of the keys() method would be a view object. The view object consists of all the keys present in the dictionary in the form of list
- The syntax for the keys() method is **dictionary\_name.keys()**
- college.keys() will display all the keys present in the dictionary i.e **dict\_keys(['name', 'location', 'rank', 'category'])**

**Python dictionary values()**

- Similar to keys(), values() method also returns a view object and the view object consists of all the values present in the dictionary in the form of list
- The syntax for the keys() method is **dictionary\_name.values()**
- college.values() will display all the values present in the dictionary i.e **dict\_values(['IIIT', 'hyderabad', 62, 'autonomous'])**

**Python dictionary items()**

- Similar to keys() & values() method, items() method also returns a view object and the view object consists of all the key-value pairs present in the dictionary in the form of tuples in a list
- The syntax for the keys() method is **dictionary\_name.items()**
- college.items() will display all the values present in the dictionary i.e **dict\_items([('name', 'IIIT'), ('location', 'hyderabad'), ('rank', 62), ('category', 'autonomous')])**

**Python dictionary update()**

- When we want to insert specified items in the dictionary, we can use update() method
- The syntax for update() method is **dictionary\_name.update(iterable)** , iterable object consists of key-value pair , which will be inserted into dictionary
- For eg: if we want to add another key value pair, i.e we want to add “landmark”:”gachibowli” into our college dictionary,we use update method
- college.update({"landmark":"gachibowli"}), will update our dictionary and our newly updated dictionary would be **{'name': 'IIIT', 'location': 'hyderabad','rank': 62,'category': 'autonomous','landmark': 'gachibowli'}**

**Python dictionary clear()**

- When we want to remove all the elements from the dictionary, we use clear() method
- The syntax for clear() method is **dictionary\_name.clear()**
- **college.clear()** , will remove all the elements from the dictionary

Now sanjay understood all the complex data types and he further decided to develop programs for the railway management system using lists, tuples and dictionaries. 

Image 3. Represents that sanjay started writing the code for booking train tickets by using list data type. Before starting with the coding part , he first defined all the inputs and functionalities step by step so while writing code, he had a proper mind map regarding what he was doing. All the functionalities  and inputs which he wanted to include in his program is listed below:

Step 1: He created a list of source stations from where the user can board a train. Initially he added only 3 stations in his list i.e he defined his list as: **source\_stations=['nagercoil','kanyakumari','vellore']**

Step 2: He created a list of destination stations i.e **destination\_stations=['goa','mumbai','delhi']**, the user would be able to get down only at the stations mentioned above

Step 3: further he created the following list:

passanger\_name=[] → stores the passenger name

passanger\_age=[] → stores the passenger age

passanger\_birth\_list=['Upper\_Birth','Middle\_Birth','Lower\_birth'] → stores different types of birth available

birth\_assigned=[] → stores the birth which is assigned to passenger based on his/her age

seat\_no=[] → stores seat number assigned to passengers

boarding\_station=[] → stores the passenger boarding station

Step 4: He kept an input statement which asks the user to enter name of the station from where the wish to board train, only if the user enters the name of the station which is present inside source\_station list, the user is further allowed to proceed, otherwise an appropriate message is displayed to the user and the program terminates 

Step 5: If the source station entered by the user in step(4) exists then the user is again asked to enter his/her destination station. If the destination station which is entered by the user is present inside destionation\_station list ,the user is further allowed to proceed, otherwise an appropriate message is displayed to the user and the program terminates

Step 6:He kept an input statement which asks the user to input his/her name(stored in passanger\_name list), his/her age(stored in passanger\_age list), from which station the user wishes to board the train from. (stored in boarding\_station list)

Step 7: If the age entered by the passenger is less than or equal to 10 and greater than or equal to 60 then the program automatically assigns lower birth to the passenger and all the births assigned to the passenger by the program are stored inside the birth\_assigned list, and along with the birth respective seat number. 

Step 8: All the assigned seat number, birth type , train details are displayed to the user in the form of a receipt. 

Step 9: Now since lists are mutable , he decided to provide a functionality which will allow the user to change his/her boarding stations (from the list of stations available in source\_station list) 

At any point in time 

Image 4 represents that next day, he tried to write code for the same program which is written above, but this time he decided to utilise tuple data type instead of list 

All the list which were created above were converted into tuples , now since tuples are immutable , he was not able to  provide a functionality which will allow the user to change his/her boarding stations (from  stations available in source\_stations tuple) At any point in time.

Image 5 represents that after writing programs using list and tuples data types, he created another program by using dictionary data types. He utilised dictionary to create food menu(which consisted of food name and price in the form of key value pair) which are available in the train canteen and it would be beneficial for all the passengers travelling on the train to have a look at the menu and order food in the train accordingly 

Image 6 represents that sanjay is happy , because all his codes are working fine and he would be able to submit his assignment before the deadline


Image References

1.<https://konversations.com/stories/index/why-cse-computer-science-engineering-1>

2.<https://www.dreamstime.com/stock-image-confused-man-question-mark-sitting-computer-above-head-image40156351>

\3. <https://www.hostinger.com/tutorials/learn-coding-online-for-free>

4.<https://www.vit.edu/blog/item/546-top-reasons-to-choose-computer-engineering-or-it-engineering>

\5. <https://realpython.com/courses/python-dictionary-iteration/>

6.<https://www.shutterstock.com/image-vector/software-developer-work-program-code-programmer-2079511849>



