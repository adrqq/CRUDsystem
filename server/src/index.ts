import express, { Express, Request, Response } from 'express';
import { Phone } from './types';
import cors from 'cors';
import path from 'path';
import phones from '../data/phones.json';
import { fileURLToPath } from 'url';
import { MongoClient } from 'mongodb';
import { ClientRequest } from 'http';

const PORT = 5210;
const client = new MongoClient('mongodb+srv://Adrian:Mongocrud2022@crud.j0ehphe.mongodb.net/?retryWrites=true&w=majority');

const names = ['Emma', 'Isabella', 'Emily', 'Madison', 'Ava', 'Olivia', 'Sophia', 'Abigail', 'Elizabeth', 'Chloe', 'Samantha', 'Addison', 'Natalie', 'Mia', 'Alexis', 'Alyssa', 'Hannah', 'Ashley', 'Ella', 'Sarah', 'Grace', 'Taylor', 'Brianna', 'Lily', 'Hailey', 'Anna', 'Victoria', 'Kayla', 'Lillian', 'Lauren', 'Kaylee', 'Allison', 'Savannah', 'Nevaeh', 'Gabriella', 'Sofia', 'Makayla', 'Avery', 'Riley', 'Julia', 'Leah', 'Aubrey', 'Jasmine', 'Audrey', 'Katherine', 'Morgan', 'Brooklyn', 'Destiny', 'Sydney', 'Alexa', 'Kylie', 'Brooke', 'Kaitlyn', 'Evelyn', 'Layla', 'Madeline', 'Kimberly', 'Zoe', 'Jessica', 'Peyton', 'Alexandra', 'Claire', 'Madelyn', 'Maria', 'Mackenzie', 'Arianna', 'Jocelyn', 'Amelia', 'Angelina', 'Trinity', 'Andrea', 'Maya', 'Valeria', 'Sophie', 'Rachel', 'Vanessa', 'Aaliyah', 'Mariah', 'Gabrielle', 'Katelyn', 'Ariana', 'Bailey', 'Camila', 'Jennifer', 'Melanie', 'Gianna', 'Charlotte', 'Paige', 'Autumn', 'Payton', 'Faith', 'Sara', 'Isabelle', 'Caroline', 'Genesis', 'Isabel', 'Mary', 'Zoey', 'Gracie', 'Megan', 'Haley', 'Mya', 'Michelle', 'Molly', 'Stephanie', 'Nicole', 'Jenna', 'Natalia', 'Sadie', 'Jada', 'Serenity', 'Lucy', 'Ruby', 'Eva', 'Kennedy', 'Rylee', 'Jayla', 'Naomi', 'Rebecca', 'Lydia', 'Daniela', 'Bella', 'Keira', 'Adriana', 'Lilly', 'Hayden', 'Miley', 'Katie', 'Jade', 'Jordan', 'Gabriela', 'Amy', 'Angela', 'Melissa', 'Valerie', 'Giselle', 'Diana', 'Amanda', 'Kate', 'Laila', 'Reagan', 'Jordyn', 'Kylee', 'Danielle', 'Briana', 'Marley', 'Leslie', 'Kendall', 'Catherine', 'Liliana', 'Mckenzie', 'Jacqueline', 'Ashlyn', 'Reese', 'Marissa', 'London', 'Juliana', 'Shelby', 'Cheyenne', 'Angel', 'Daisy', 'Makenzie', 'Miranda', 'Erin', 'Amber', 'Alana', 'Ellie', 'Breanna', 'Ana', 'Mikayla', 'Summer', 'Piper', 'Adrianna', 'Jillian', 'Sierra', 'Jayden', 'Sienna', 'Alicia', 'Lila', 'Margaret', 'Alivia', 'Brooklynn', 'Karen', 'Violet', 'Sabrina', 'Stella', 'Aniyah', 'Annabelle', 'Alexandria', 'Kathryn', 'Skylar', 'Aliyah', 'Delilah', 'Julianna', 'Kelsey', 'Khloe', 'Carly', 'Amaya', 'Mariana', 'Christina', 'Alondra', 'Tessa', 'Eliana', 'Bianca', 'Jazmin', 'Clara', 'Vivian', 'Josephine', 'Delaney', 'Scarlett', 'Elena', 'Cadence', 'Alexia', 'Maggie', 'Laura', 'Nora', 'Ariel', 'Elise', 'Nadia', 'Mckenna', 'Chelsea', 'Lyla', 'Alaina', 'Jasmin', 'Hope', 'Leila', 'Caitlyn', 'Cassidy', 'Makenna', 'Allie', 'Izabella', 'Eden', 'Callie', 'Haylee', 'Caitlin', 'Kendra', 'Karina', 'Kyra', 'Kayleigh', 'Addyson', 'Kiara', 'Jazmine', 'Karla', 'Camryn', 'Alina', 'Lola', 'Kyla', 'Kelly', 'Fatima', 'Tiffany', 'Kira', 'Crystal', 'Mallory', 'Esmeralda', 'Alejandra', 'Eleanor', 'Angelica', 'Jayda', 'Abby', 'Kara', 'Veronica', 'Carmen', 'Jamie', 'Ryleigh', 'Valentina', 'Allyson', 'Dakota', 'Kamryn', 'Courtney', 'Cecilia', 'Madeleine', 'Aniya', 'Alison', 'Esther', 'Heaven', 'Aubree', 'Lindsey', 'Leilani', 'Nina', 'Melody', 'Macy', 'Ashlynn', 'Joanna', 'Cassandra', 'Alayna', 'Kaydence', 'Madilyn', 'Aurora', 'Heidi', 'Emerson', 'Kimora', 'Madalyn', 'Erica', 'Josie', 'Katelynn', 'Guadalupe', 'Harper', 'Ivy', 'Lexi', 'Camille', 'Savanna', 'Dulce', 'Daniella', 'Lucia', 'Emely', 'Joselyn', 'Kiley', 'Kailey', 'Miriam', 'Cynthia', 'Rihanna', 'Georgia', 'Rylie', 'Harmony', 'Kiera', 'Kyleigh', 'Monica', 'Bethany', 'Kaylie', 'Cameron', 'Teagan', 'Cora', 'Brynn', 'Ciara', 'Genevieve', 'Alice', 'Maddison', 'Eliza', 'Tatiana', 'Jaelyn', 'Erika', 'Ximena', 'April', 'Marely', 'Julie', 'Danica', 'Presley', 'Brielle', 'Julissa', 'Angie', 'Iris', 'Brenda', 'Hazel', 'Rose', 'Malia', 'Shayla', 'Fiona', 'Phoebe', 'Nayeli', 'Paola', 'Kaelyn', 'Selena', 'Audrina', 'Rebekah', 'Carolina', 'Janiyah', 'Michaela', 'Penelope', 'Janiya', 'Anastasia', 'Adeline', 'Ruth', 'Sasha', 'Denise', 'Holly', 'Madisyn', 'Hanna', 'Tatum', 'Marlee', 'Nataly', 'Helen', 'Janelle', 'Lizbeth', 'Serena', 'Anya', 'Jaslene', 'Kaylin', 'Jazlyn', 'Nancy', 'Lindsay', 'Desiree', 'Hayley', 'Itzel', 'Imani', 'Madelynn', 'Asia', 'Kadence', 'Madyson', 'Talia', 'Jane', 'Kayden', 'Annie', 'Amari', 'Bridget', 'Raegan', 'Jadyn', 'Celeste', 'Jimena', 'Luna', 'Yasmin', 'Emilia', 'Annika', 'Estrella', 'Sarai', 'Lacey', 'Ayla', 'Alessandra', 'Willow', 'Nyla', 'Dayana', 'Lilah', 'Lilliana', 'Natasha', 'Hadley', 'Harley', 'Priscilla', 'Claudia', 'Allisson', 'Baylee', 'Brenna', 'Brittany', 'Skyler', 'Fernanda', 'Danna', 'Melany', 'Cali', 'Lia', 'Macie', 'Lyric', 'Logan', 'Gloria', 'Lana', 'Mylee', 'Cindy', 'Lilian', 'Amira', 'Anahi', 'Alissa', 'Anaya', 'Lena', 'Ainsley', 'Sandra', 'Noelle', 'Marisol', 'Meredith', 'Kailyn', 'Lesly', 'Johanna', 'Diamond', 'Evangeline', 'Juliet', 'Kathleen', 'Meghan', 'Paisley', 'Athena', 'Hailee', 'Rosa', 'Wendy', 'Emilee', 'Sage', 'Alanna', 'Elaina', 'Cara', 'Nia', 'Paris', 'Casey', 'Dana', 'Emery', 'Rowan', 'Aubrie', 'Kaitlin', 'Jaden', 'Kenzie', 'Kiana', 'Viviana', 'Norah', 'Lauryn', 'Perla', 'Amiyah', 'Alyson', 'Rachael', 'Shannon', 'Aileen', 'Miracle', 'Lillie', 'Danika', 'Heather', 'Kassidy', 'Taryn', 'Tori', 'Francesca', 'Kristen', 'Amya', 'Elle', 'Kristina', 'Cheyanne', 'Haylie', 'Patricia', 'Anne', 'Samara', 'Skye', 'Kali', 'America', 'Lexie', 'Parker', 'Halle', 'Londyn', 'Abbigail', 'Linda', 'Hallie', 'Saniya', 'Bryanna', 'Bailee', 'Jaylynn', 'Mckayla', 'Quinn', 'Jaelynn', 'Jaida', 'Caylee', 'Jaiden', 'Melina', 'Abril', 'Sidney', 'Kassandra', 'Elisabeth', 'Adalyn', 'Kaylynn', 'Mercedes', 'Yesenia', 'Elliana', 'Brylee', 'Dylan', 'Isabela', 'Ryan', 'Ashlee', 'Daphne', 'Kenya', 'Marina', 'Christine', 'Mikaela', 'Kaitlynn', 'Justice', 'Saniyah', 'Jaliyah', 'Ingrid', 'Marie', 'Natalee', 'Joy', 'Juliette', 'Simone', 'Adelaide', 'Krystal', 'Kennedi', 'Mila', 'Tamia', 'Addisyn', 'Aylin', 'Dayanara', 'Sylvia', 'Clarissa', 'Maritza', 'Virginia', 'Braelyn', 'Jolie', 'Jaidyn', 'Kinsley', 'Kirsten', 'Laney', 'Marilyn', 'Whitney', 'Janessa', 'Raquel', 'Anika', 'Kamila', 'Aria', 'Rubi', 'Adelyn', 'Amara', 'Ayanna', 'Teresa', 'Zariah', 'Kaleigh', 'Amani', 'Carla', 'Yareli', 'Gwendolyn', 'Paulina', 'Nathalie', 'Annabella', 'Jaylin', 'Tabitha', 'Deanna', 'Madalynn', 'Journey', 'Aiyana', 'Skyla', 'Yaretzi', 'Ada', 'Liana', 'Karlee', 'Jenny', 'Myla', 'Cristina', 'Myah', 'Lisa', 'Tania', 'Isis', 'Jayleen', 'Jordin', 'Arely', 'Azul', 'Helena', 'Aryanna', 'Jaqueline', 'Lucille', 'Destinee', 'Martha', 'Zoie', 'Arielle', 'Liberty', 'Marlene', 'Elisa', 'Isla', 'Noemi', 'Raven', 'Jessie', 'Aleah', 'Kailee', 'Kaliyah', 'Lilyana', 'Haven', 'Tara', 'Giana', 'Camilla', 'Maliyah', 'Irene', 'Carley', 'Maeve', 'Lea', 'Macey', 'Sharon', 'Alisha', 'Marisa', 'Jaylene', 'Kaya', 'Scarlet', 'Siena', 'Adyson', 'Maia', 'Shiloh', 'Tiana', 'Jaycee', 'Gisselle', 'Yazmin', 'Eve', 'Shyanne', 'Arabella', 'Sherlyn', 'Sariah', 'Amiya', 'Kiersten', 'Madilynn', 'Shania', 'Aleena', 'Finley', 'Kinley', 'Kaia', 'Aliya', 'Taliyah', 'Pamela', 'Yoselin', 'Ellen', 'Carlie', 'Monserrat', 'Jakayla', 'Reyna', 'Yaritza', 'Carolyn', 'Clare', 'Lorelei', 'Paula', 'Zaria', 'Gracelyn', 'Kasey', 'Regan', 'Alena', 'Angelique', 'Regina', 'Britney', 'Emilie', 'Mariam', 'Jaylee', 'Julianne', 'Greta', 'Elyse', 'Lainey', 'Kallie', 'Felicity', 'Zion', 'Aspen', 'Carlee', 'Annalise', 'Iliana', 'Larissa', 'Akira', 'Sonia', 'Catalina', 'Phoenix', 'Joslyn', 'Anabelle', 'Mollie', 'Susan', 'Judith', 'Destiney', 'Hillary', 'Janet', 'Katrina', 'Mareli', 'Ansley', 'Kaylyn', 'Alexus', 'Gia', 'Maci', 'Elsa', 'Stacy', 'Kaylen', 'Carissa', 'Haleigh', 'Lorena', 'Jazlynn', 'Milagros', 'Luz', 'Leanna', 'Renee', 'Shaniya', 'Charlie', 'Abbie', 'Cailyn', 'Cherish', 'Elsie', 'Jazmyn', 'Elaine', 'Emmalee', 'Luciana', 'Dahlia', 'Jamya', 'Belinda', 'Mariyah', 'Chaya', 'Dayami', 'Rhianna', 'Yadira', 'Aryana', 'Rosemary', 'Armani', 'Cecelia', 'Celia', 'Barbara', 'Cristal', 'Eileen', 'Rayna', 'Campbell', 'Amina', 'Aisha', 'Amirah', 'Ally', 'Araceli', 'Averie', 'Mayra', 'Sanaa', 'Patience', 'Leyla', 'Selah', 'Zara', 'Chanel', 'Kaiya', 'Keyla', 'Miah', 'Aimee', 'Giovanna', 'Amelie', 'Kelsie', 'Alisson', 'Angeline', 'Dominique', 'Adrienne', 'Brisa', 'Cierra', 'Paloma', 'Isabell', 'Precious', 'Alma', 'Charity', 'Jacquelyn', 'Janae', 'Frances', 'Shyla', 'Janiah', 'Kierra', 'Karlie', 'Annabel', 'Jacey', 'Karissa', 'Jaylah', 'Xiomara', 'Edith', 'Marianna', 'Damaris', 'Deborah', 'Jaylyn', 'Evelin', 'Mara', 'Olive', 'Ayana', 'India', 'Kendal', 'Kayley', 'Tamara', 'Briley', 'Charlee', 'Nylah', 'Abbey', 'Moriah', 'Saige', 'Savanah', 'Giada', 'Hana', 'Lizeth', 'Matilda', 'Ann', 'Jazlene', 'Gillian', 'Beatrice', 'Ireland', 'Karly', 'Mylie', 'Yasmine', 'Ashly', 'Kenna', 'Maleah', 'Corinne', 'Keely', 'Tanya', 'Tianna', 'Adalynn', 'Ryann', 'Salma', 'Areli', 'Karma', 'Shyann', 'Kaley', 'Theresa', 'Evie', 'Gina', 'Roselyn', 'Kaila', 'Jaylen', 'Natalya', 'Meadow', 'Rayne', 'Aliza', 'Yuliana', 'June', 'Lilianna', 'Nathaly', 'Ali', 'Alisa', 'Aracely', 'Belen', 'Tess', 'Jocelynn', 'Litzy', 'Makena', 'Abagail', 'Giuliana', 'Joyce', 'Libby', 'Lillianna', 'Thalia', 'Tia', 'Sarahi', 'Zaniyah', 'Kristin', 'Lorelai', 'Mattie', 'Taniya', 'Jaslyn', 'Gemma', 'Valery', 'Lailah', 'Mckinley', 'Micah', 'Deja', 'Frida', 'Brynlee', 'Jewel', 'Krista', 'Mira', 'Yamilet', 'Adison', 'Carina', 'Karli', 'Magdalena', 'Stephany', 'Charlize', 'Raelynn', 'Aliana', 'Cassie', 'Mina', 'Karley', 'Shirley', 'Marlie', 'Alani', 'Taniyah', 'Cloe', 'Sanai', 'Lina', 'Nola', 'Anabella', 'Dalia', 'Raina', 'Mariela', 'Ariella', 'Bria', 'Kamari', 'Monique', 'Ashleigh', 'Reina', 'Alia', 'Ashanti', 'Lara', 'Lilia', 'Justine', 'Leia', 'Maribel', 'Abigayle', 'Tiara', 'Alannah', 'Princess', 'Sydnee', 'Kamora', 'Paityn', 'Payten', 'Naima', 'Gretchen', 'Heidy', 'Nyasia', 'Livia', 'Marin', 'Shaylee', 'Maryjane', 'Laci', 'Nathalia', 'Azaria', 'Anabel', 'Chasity', 'Emmy', 'Izabelle', 'Denisse', 'Emelia', 'Mireya', 'Shea', 'Amiah', 'Dixie', 'Maren', 'Averi', 'Esperanza', 'Micaela', 'Selina', 'Alyvia', 'Chana', 'Avah', 'Donna', 'Kaylah', 'Ashtyn', 'Karsyn', 'Makaila', 'Shayna', 'Essence', 'Leticia', 'Miya', 'Rory', 'Desirae', 'Kianna', 'Laurel', 'Neveah', 'Amaris', 'Hadassah', 'Dania', 'Hailie', 'Jamiya', 'Kathy', 'Laylah', 'Riya', 'Diya', 'Carleigh', 'Iyana', 'Kenley', 'Sloane', 'Elianna'];
const surnames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Rodriguez', 'Wilson', 'Martinez', 'Anderson', 'Taylor', 'Thomas', 'Hernandez', 'Moore', 'Martin', 'Jackson', 'Thompson', 'White', 'Lopez', 'Lee', 'Gonzalez', 'Harris', 'Clark', 'Lewis', 'Robinson', 'Walker', 'Perez', 'Hall', 'Young', 'Allen', 'Sanchez', 'Wright', 'King', 'Scott', 'Green', 'Baker', 'Adams', 'Nelson', 'Hill', 'Ramirez', 'Campbell', 'Mitchell', 'Roberts', 'Carter', 'Phillips', 'Evans', 'Turner', 'Torres', 'Parker', 'Collins', 'Edwards', 'Stewart', 'Flores', 'Morris', 'Nguyen', 'Murphy', 'Rivera', 'Cook', 'Rogers', 'Morgan', 'Peterson', 'Cooper', 'Reed', 'Bailey', 'Bell', 'Gomez', 'Kelly', 'Howard', 'Ward', 'Cox', 'Diaz', 'Richardson', 'Wood', 'Watson', 'Brooks', 'Bennett', 'Gray', 'James', 'Reyes', 'Cruz', 'Hughes', 'Price', 'Myers', 'Long', 'Foster', 'Sanders', 'Ross', 'Morales', 'Powell', 'Sullivan', 'Russell', 'Ortiz', 'Jenkins', 'Gutierrez', 'Perry', 'Butler', 'Barnes', 'Fisher', 'Henderson', 'Coleman', 'Simmons', 'Patterson', 'Jordan', 'Reynolds', 'Hamilton', 'Graham', 'Kim', 'Gonzales', 'Alexander', 'Ramos', 'Wallace', 'Griffin', 'West', 'Cole', 'Hayes', 'Chavez', 'Gibson', 'Bryant', 'Ellis', 'Stevens', 'Murray', 'Ford', 'Marshall', 'Owens', 'Mcdonald', 'Harrison', 'Ruiz', 'Kennedy', 'Wells', 'Alvarez', 'Woods', 'Mendoza', 'Castillo', 'Olson', 'Webb', 'Washington', 'Tucker', 'Freeman', 'Burns', 'Henry', 'Vasquez', 'Snyder', 'Simpson', 'Crawford', 'Jimenez', 'Porter', 'Mason', 'Shaw', 'Gordon', 'Wagner', 'Hunter', 'Romero', 'Hicks', 'Dixon', 'Hunt', 'Palmer', 'Robertson', 'Black', 'Holmes', 'Stone', 'Meyer', 'Boyd', 'Mills', 'Warren', 'Fox', 'Rose', 'Rice', 'Moreno', 'Schmidt', 'Patel', 'Ferguson', 'Nichols', 'Herrera', 'Medina', 'Ryan', 'Fernandez', 'Weaver', 'Daniels', 'Stephens', 'Gardner', 'Payne', 'Kelley', 'Dunn', 'Pierce', 'Arnold', 'Tran', 'Spencer', 'Peters', 'Hawkins', 'Grant', 'Hansen', 'Castro', 'Hoffman', 'Hart', 'Elliott', 'Cunningham', 'Knight', 'Bradley', 'Carroll', 'Hudson', 'Duncan', 'Armstrong', 'Berry', 'Andrews', 'Johnston', 'Ray', 'Lane', 'Riley', 'Carpenter', 'Perkins', 'Aguilar', 'Silva', 'Richards', 'Willis', 'Matthews', 'Chapman', 'Lawrence', 'Garza', 'Vargas', 'Watkins', 'Wheeler', 'Larson', 'Carlson', 'Harper', 'George', 'Greene', 'Burke', 'Guzman', 'Morrison', 'Munoz', 'Jacobs', 'Obrien', 'Lawson', 'Franklin', 'Lynch', 'Bishop', 'Carr', 'Salazar', 'Austin', 'Mendez', 'Gilbert', 'Jensen', 'Williamson', 'Montgomery', 'Harvey', 'Oliver', 'Howell', 'Dean', 'Hanson', 'Weber', 'Garrett', 'Sims', 'Burton', 'Fuller', 'Soto', 'Mccoy', 'Welch', 'Chen', 'Schultz', 'Walters', 'Reid', 'Fields', 'Walsh', 'Little', 'Fowler', 'Bowman', 'Davidson', 'May', 'Day', 'Schneider', 'Newman', 'Brewer', 'Lucas', 'Holland', 'Wong', 'Banks', 'Santos', 'Curtis', 'Pearson', 'Delgado', 'Valdez', 'Pena', 'Rios', 'Douglas', 'Sandoval', 'Barrett', 'Hopkins', 'Keller', 'Guerrero', 'Stanley', 'Bates', 'Alvarado', 'Beck', 'Ortega', 'Wade', 'Estrada', 'Contreras', 'Barnett', 'Caldwell', 'Santiago', 'Lambert', 'Powers', 'Chambers', 'Nunez', 'Craig', 'Leonard', 'Lowe', 'Rhodes', 'Byrd', 'Gregory', 'Shelton', 'Frazier', 'Becker', 'Maldonado', 'Fleming', 'Vega', 'Sutton', 'Cohen', 'Jennings', 'Parks', 'Mcdaniel', 'Watts', 'Barker', 'Norris', 'Vaughn', 'Vazquez', 'Holt', 'Schwartz', 'Steele', 'Benson', 'Neal', 'Dominguez', 'Horton', 'Terry', 'Wolfe', 'Hale', 'Lyons', 'Graves', 'Haynes', 'Miles', 'Park', 'Warner', 'Padilla', 'Bush', 'Thornton', 'Mccarthy', 'Mann', 'Zimmerman', 'Erickson', 'Fletcher', 'Mckinney', 'Page', 'Dawson', 'Joseph', 'Marquez', 'Reeves', 'Klein', 'Espinoza', 'Baldwin', 'Moran', 'Love', 'Robbins', 'Higgins', 'Ball', 'Cortez', 'Le', 'Griffith', 'Bowen', 'Sharp', 'Cummings', 'Ramsey', 'Hardy', 'Swanson', 'Barber', 'Acosta', 'Luna', 'Chandler', 'Blair', 'Daniel', 'Cross', 'Simon', 'Dennis', 'Oconnor', 'Quinn', 'Gross', 'Navarro', 'Moss', 'Fitzgerald', 'Doyle', 'Mclaughlin', 'Rojas', 'Rodgers', 'Stevenson', 'Singh', 'Yang', 'Figueroa', 'Harmon', 'Newton', 'Paul', 'Manning', 'Garner', 'Mcgee', 'Reese', 'Francis', 'Burgess', 'Adkins', 'Goodman', 'Curry', 'Brady', 'Christensen', 'Potter', 'Walton', 'Goodwin', 'Mullins', 'Molina', 'Webster', 'Fischer', 'Campos', 'Avila', 'Sherman', 'Todd', 'Chang', 'Blake', 'Malone', 'Wolf', 'Hodges', 'Juarez', 'Gill', 'Farmer', 'Hines', 'Gallagher', 'Duran', 'Hubbard', 'Cannon', 'Miranda', 'Wang', 'Saunders', 'Tate', 'Mack', 'Hammond', 'Carrillo', 'Townsend', 'Wise', 'Ingram', 'Barton', 'Mejia', 'Ayala', 'Schroeder', 'Hampton', 'Rowe', 'Parsons', 'Frank', 'Waters', 'Strickland', 'Osborne', 'Maxwell', 'Chan', 'Deleon', 'Norman', 'Harrington', 'Casey', 'Patton', 'Logan', 'Bowers', 'Mueller', 'Glover', 'Floyd', 'Hartman', 'Buchanan', 'Cobb', 'French', 'Kramer', 'Mccormick', 'Clarke', 'Tyler', 'Gibbs', 'Moody', 'Conner', 'Sparks', 'Mcguire', 'Leon', 'Bauer', 'Norton', 'Pope', 'Flynn', 'Hogan', 'Robles', 'Salinas', 'Yates', 'Lindsey', 'Lloyd', 'Marsh', 'Mcbride', 'Owen', 'Solis', 'Pham', 'Lang', 'Pratt', 'Lara', 'Brock', 'Ballard', 'Trujillo', 'Shaffer', 'Drake', 'Roman', 'Aguirre', 'Morton', 'Stokes', 'Lamb', 'Pacheco', 'Patrick', 'Cochran', 'Shepherd', 'Cain', 'Burnett', 'Hess', 'Li', 'Cervantes', 'Olsen', 'Briggs', 'Ochoa', 'Cabrera', 'Velasquez', 'Montoya', 'Roth', 'Meyers', 'Cardenas', 'Fuentes', 'Weiss', 'Hoover', 'Wilkins', 'Nicholson', 'Underwood', 'Short', 'Carson', 'Morrow', 'Colon', 'Holloway', 'Summers', 'Bryan', 'Petersen', 'Mckenzie', 'Serrano', 'Wilcox', 'Carey', 'Clayton', 'Poole', 'Calderon', 'Gallegos', 'Greer', 'Rivas', 'Guerra', 'Decker', 'Collier', 'Wall', 'Whitaker', 'Bass', 'Flowers', 'Davenport', 'Conley', 'Houston', 'Huff', 'Copeland', 'Hood', 'Monroe', 'Massey', 'Roberson', 'Combs', 'Franco', 'Larsen', 'Pittman', 'Randall', 'Skinner', 'Wilkinson', 'Kirby', 'Cameron', 'Bridges', 'Anthony', 'Richard', 'Kirk', 'Bruce', 'Singleton', 'Mathis', 'Bradford', 'Boone', 'Abbott', 'Charles', 'Allison', 'Sweeney', 'Atkinson', 'Horn', 'Jefferson', 'Rosales', 'York', 'Christian', 'Phelps', 'Farrell', 'Castaneda', 'Nash', 'Dickerson', 'Bond', 'Wyatt', 'Foley', 'Chase', 'Gates', 'Vincent', 'Mathews', 'Hodge', 'Garrison', 'Trevino', 'Villarreal', 'Heath', 'Dalton', 'Valencia', 'Callahan', 'Hensley', 'Atkins', 'Huffman', 'Roy', 'Boyer', 'Shields', 'Lin', 'Hancock', 'Grimes', 'Glenn', 'Cline', 'Delacruz', 'Camacho', 'Dillon', 'Parrish', 'Oneill', 'Melton', 'Booth', 'Kane', 'Berg', 'Harrell', 'Pitts', 'Savage', 'Wiggins', 'Brennan', 'Salas', 'Marks', 'Russo', 'Sawyer', 'Baxter', 'Golden', 'Hutchinson', 'Liu', 'Walter', 'Mcdowell', 'Wiley', 'Rich', 'Humphrey', 'Johns', 'Koch', 'Suarez', 'Hobbs', 'Beard', 'Gilmore', 'Ibarra', 'Keith', 'Macias', 'Khan', 'Andrade', 'Ware', 'Stephenson', 'Henson', 'Wilkerson', 'Dyer', 'Mcclure', 'Blackwell', 'Mercado', 'Tanner', 'Eaton', 'Clay', 'Barron', 'Beasley', 'Oneal', 'Preston', 'Small', 'Wu', 'Zamora', 'Macdonald', 'Vance', 'Snow', 'Mcclain', 'Stafford', 'Orozco', 'Barry', 'English', 'Shannon', 'Kline', 'Jacobson', 'Woodard', 'Huang', 'Kemp', 'Mosley', 'Prince', 'Merritt', 'Hurst', 'Villanueva', 'Roach', 'Nolan', 'Lam', 'Yoder', 'Mccullough', 'Lester', 'Santana', 'Valenzuela', 'Winters', 'Barrera', 'Leach', 'Orr', 'Berger', 'Mckee', 'Strong', 'Conway', 'Stein', 'Whitehead', 'Bullock', 'Escobar', 'Knox', 'Meadows', 'Solomon', 'Velez', 'Odonnell', 'Kerr', 'Stout', 'Blankenship', 'Browning', 'Kent', 'Lozano', 'Bartlett', 'Pruitt', 'Buck', 'Barr', 'Gaines', 'Durham', 'Gentry', 'Mcintyre', 'Sloan', 'Melendez', 'Rocha', 'Herman', 'Sexton', 'Moon', 'Hendricks', 'Rangel', 'Stark', 'Lowery', 'Hardin', 'Hull', 'Sellers', 'Ellison', 'Calhoun', 'Gillespie', 'Mora', 'Knapp', 'Mccall', 'Morse', 'Dorsey', 'Weeks', 'Nielsen', 'Livingston', 'Leblanc', 'Mclean', 'Bradshaw', 'Glass', 'Middleton', 'Buckley', 'Schaefer', 'Frost', 'Howe', 'House', 'Mcintosh', 'Ho', 'Pennington', 'Reilly', 'Hebert', 'Mcfarland', 'Hickman', 'Noble', 'Spears', 'Conrad', 'Arias', 'Galvan', 'Velazquez', 'Huynh', 'Frederick', 'Randolph', 'Cantu', 'Fitzpatrick', 'Mahoney', 'Peck', 'Villa', 'Michael', 'Donovan', 'Mcconnell', 'Walls', 'Boyle', 'Mayer', 'Zuniga', 'Giles', 'Pineda', 'Pace', 'Hurley', 'Mays', 'Mcmillan', 'Crosby', 'Ayers', 'Case', 'Bentley', 'Shepard', 'Everett', 'Pugh', 'David', 'Mcmahon', 'Dunlap', 'Bender', 'Hahn', 'Harding', 'Acevedo', 'Raymond', 'Blackburn', 'Duffy', 'Landry', 'Dougherty', 'Bautista', 'Shah', 'Potts', 'Arroyo', 'Valentine', 'Meza', 'Gould', 'Vaughan', 'Fry', 'Rush', 'Avery', 'Herring', 'Dodson', 'Clements', 'Sampson', 'Tapia', 'Bean', 'Lynn', 'Crane', 'Farley', 'Cisneros', 'Benton', 'Ashley', 'Mckay', 'Finley', 'Best', 'Blevins', 'Friedman', 'Moses', 'Sosa', 'Blanchard', 'Huber', 'Frye', 'Krueger', 'Bernard', 'Rosario', 'Rubio', 'Mullen', 'Benjamin', 'Haley', 'Chung', 'Moyer', 'Choi', 'Horne', 'Yu', 'Woodward', 'Ali', 'Nixon', 'Hayden', 'Rivers', 'Estes', 'Mccarty', 'Richmond', 'Stuart', 'Maynard', 'Brandt', 'Oconnell', 'Hanna', 'Sanford', 'Sheppard', 'Church', 'Burch', 'Levy', 'Rasmussen', 'Coffey', 'Ponce', 'Faulkner', 'Donaldson', 'Schmitt', 'Novak', 'Costa', 'Montes', 'Booker', 'Cordova', 'Waller', 'Arellano', 'Maddox', 'Mata', 'Bonilla', 'Stanton', 'Compton', 'Kaufman', 'Dudley', 'Mcpherson', 'Beltran', 'Dickson', 'Mccann', 'Villegas', 'Proctor', 'Hester', 'Cantrell', 'Daugherty', 'Cherry', 'Bray', 'Davila', 'Rowland', 'Levine', 'Madden', 'Spence', 'Good', 'Irwin', 'Werner', 'Krause', 'Petty', 'Whitney', 'Baird', 'Hooper', 'Pollard', 'Zavala', 'Jarvis', 'Holden', 'Haas', 'Hendrix', 'Mcgrath', 'Bird', 'Lucero', 'Terrell', 'Riggs', 'Joyce', 'Mercer', 'Rollins', 'Galloway', 'Duke', 'Odom', 'Andersen', 'Downs', 'Hatfield', 'Benitez', 'Archer', 'Huerta', 'Travis', 'Mcneil', 'Hinton', 'Zhang', 'Hays', 'Mayo', 'Fritz', 'Branch', 'Mooney', 'Ewing', 'Ritter', 'Esparza', 'Frey', 'Braun', 'Gay', 'Riddle', 'Haney', 'Kaiser', 'Holder', 'Chaney', 'Mcknight', 'Gamble', 'Vang', 'Cooley', 'Carney', 'Cowan', 'Forbes', 'Ferrell', 'Davies', 'Barajas', 'Shea', 'Osborn', 'Bright', 'Cuevas', 'Bolton', 'Murillo', 'Lutz', 'Duarte', 'Kidd', 'Key', 'Cooke'];

// add users to db

// const addUsers = async () => {
//   try {
//     await client.connect();

//     const users = client.db().collection('users');

//     for (let i = 1; i <= 60; i++) {
//       await users.insertOne({
//         name: names[i],
//         surname: surnames[i],
//         email: `forever${Math.floor(Math.random() * 100000)}@gmail.com`,
//         phone: `+38099${Math.floor(Math.random() * 10000000)}`,
//         id: i,
//         date: Date.now(),
//         eventsCount: 0,
//       });
//     }

//     console.log('Sucsessfully added users');
//   } catch(err) {
//     console.log(err);
//   } finally {
//     await client.close();
//   }
// };

// addUsers();

// delete all users

// const deleteUsers = async () => {
//   try {
//     const users = client.db().collection('users');
//     await users.deleteMany({});
//     console.log('Deleted users correctly');
//   } catch (err) {
//     console.log(err);
//   }
// };

// deleteUsers();

// create events collection and add events to db with fields: name, description, date, id

// const addEvents1method = async () => {
//   try {
//     await client.connect();
//     const events = client.db().collection('events');
//     let id = 0;

//     for (let i = 1; i <= 60; i++) {
//       for(let j = 1; j <= 40; j++) {
//         id++;

//         await events.insertOne({
//           id: id,
//           name: `Event ${j}`,
//           description: `Description ${j}`,
//           date: Date.now(),
//           userId: i,
//         });
//       }
//     }
//     console.log('Sucsessfully added events');

//   } catch(err) {
//     console.log(err);
//   } finally {
//     await client.close();
//   }
// };

// addEvents1method();


// delete all events
// const deleteEvents = async () => {
//   try {
//     const events = client.db().collection('events');
//     await events.deleteMany({});
//     console.log('Deleted events correctly');
//   } catch (err) {
//     console.log(err);
//   }
// };

// deleteEvents();

function connectToMongo() {
  client.connect().then(() => {
    console.log('Connected correctly to server');
  }).catch(err => {
    console.log(err);
  });
}

connectToMongo();

const app: Express = express();

app.use(cors());

app.use('/', (req, res, next) => {
  next();
  app.use(express.json());

  app.get('/users', (req: Request, res: Response) => {
    const { _limit, _sort, _page } = req.query;

    console.log(_limit, _sort);
    const getUsers = async () => {
      try {
        await client.connect();
        const users = client.db().collection('users');
        let cursor;

        switch (_sort) {
          case 'NameUp':
            cursor = users.find().sort({ name: -1 }).skip((Number(_page) - 1) * Number(_limit)).limit(Number(_limit));
            break;
          case 'NameDown':
            cursor = users.find().sort({ name: 1 }).skip((Number(_page) - 1) * Number(_limit)).limit(Number(_limit));
            break;
          case 'SurnameUp':
            cursor = users.find().sort({ surname: -1 }).skip((Number(_page) - 1) * Number(_limit)).limit(Number(_limit));
            break;
          case 'SurnameDown':
            cursor = users.find().sort({ surname: 1 }).skip((Number(_page) - 1) * Number(_limit)).limit(Number(_limit));
            break;
          case 'DateAddedUp':
            cursor = users.find().sort({ date: -1 }).skip((Number(_page) - 1) * Number(_limit)).limit(Number(_limit));
            break;
          case 'DateAddedDown':
            cursor = users.find().sort({ date: 1 }).skip((Number(_page) - 1) * Number(_limit)).limit(Number(_limit));
            break;

          case 'IDup':
            cursor = users.find().sort({ id: 1 }).skip((Number(_page) - 1) * Number(_limit)).limit(Number(_limit));
            break;

          case 'IDdown':
            cursor = users.find().sort({ id: -1 }).skip((Number(_page) - 1) * Number(_limit)).limit(Number(_limit));
            break;
          default:
            cursor = users.find().skip((Number(_page) - 1) * Number(_limit)).limit(Number(_limit));
        }

        const results = await cursor.toArray();
        const totalCount = await users.countDocuments();

        for (let i = 0; i < results.length; i++) {
          const events = client.db().collection('events');
          const evData = events.find({ userId: Number(results[i].id) });
          const count = await evData.toArray();

          let times = count.map(eve => eve.date)
          console.log(times);

          times = times.filter(el => el - Date.now() >= 0)

          results[i] = {
            ...results[i],
            eventsCount: count.length,
            timeToNextEvent: Math.min(...times) || 0,
          };
        }

        res.send([results, totalCount]);
      } catch (err) {
        res.status(500).send('error505');
        console.log(err);
      }
    };

    getUsers();
  });

  app.get('/events', (req: Request, res: Response) => {
    const { userId, _limit, _sort, _page } = req.query;

    const getEvents = async () => {
      try {
        console.log('userid', userId);
        console.log('limit', _limit);
        console.log('sort', _sort);
        console.log('page', _page);

        // client.connect().then(() => {
        //   console.log('Connected correctly to server');
        // }).catch(err => {
        //   console.log(err);
        // });

        const events = client.db().collection('events');
        // const eventsData = await events.find({ userId: Number(userId) }).skip((Number(_page) - 1) * Number(_limit)).limit(Number(_limit)).toArray();

        let cursor;

        switch (_sort) {
          case 'NameUp':
            cursor = events.find({ userId: Number(userId) }).sort({ name: -1 }).skip((Number(_page) - 1) * Number(_limit)).limit(Number(_limit));
            break;
          case 'NameDown':
            cursor = events.find({ userId: Number(userId) }).sort({ name: 1 }).skip((Number(_page) - 1) * Number(_limit)).limit(Number(_limit));
            break;
          case 'DateAddedUp':
            cursor = events.find({ userId: Number(userId) }).sort({ date: 1 }).skip((Number(_page) - 1) * Number(_limit)).limit(Number(_limit));
            break;
          case 'DateAddedDown':
            cursor = events.find({ userId: Number(userId) }).sort({ date: -1 }).skip((Number(_page) - 1) * Number(_limit)).limit(Number(_limit));
            break;

          case 'IDup':
            cursor = events.find({ userId: Number(userId) }).sort({ id: 1 }).skip((Number(_page) - 1) * Number(_limit)).limit(Number(_limit));
            break;

          case 'IDdown':
            cursor = events.find({ userId: Number(userId) }).sort({ id: -1 }).skip((Number(_page) - 1) * Number(_limit)).limit(Number(_limit));
            break;
          default:
            cursor = events.find({ userId: Number(userId) }).skip((Number(_page) - 1) * Number(_limit)).limit(Number(_limit));
        }

        const results = await cursor.toArray();
        const totalCount = await events.countDocuments({ userId: Number(userId) });

        res.send([results, totalCount]);

        // await client.close();
      } catch (err) {
        console.log(err);
      }
    };

    getEvents();
  });

  app.post('/events', (req: Request, res: Response) => {
    const { id, name, description, date, startTime, endTime, userId } = req.body;

    const addEvents = async () => {
      try {
        // client.connect().then(() => {
        //   console.log('Connected correctly to server');
        // }).catch(err => {
        //   console.log(err);
        // });

        const events = client.db().collection('events');
        await events.insertOne({
          id,
          name,
          description,
          date,
          startTime,
          endTime,
          userId,
        });

        console.log(id, name, description, userId);

        res.send('Event added');

        // await client.close();
      } catch (err) {
        console.log(err);
      }
    };

    addEvents();
  });

  app.post('/users', (req: Request, res: Response) => {
    const { name, surname, email, phone, takenTimes } = req.body;

    const addUsers = async () => {
      try {
        // client.connect().then(() => {
        //   console.log('Connected correctly to server');
        // }).catch(err => {
        //   console.log(err);
        // });

        const users = client.db().collection('users');
        const usersCount = await users.countDocuments();
        await users.insertOne({
          name,
          surname,
          email,
          phone,
          date: Date.now(),
          id: usersCount + 1,
          takenTimes: takenTimes
        });

        res.send('User added');

        // await client.close();
      } catch (err) {
        console.log(err);
      }
    };

    addUsers();
  });

  app.post('/users/delete', (req: Request, res: Response) => {
    const { _userId } = req.query

    const users = client.db().collection('users');

    console.log(_userId)

    users.deleteOne({ 'id': Number(_userId) })

    res.send('User deleted')
  })

  app.post('/events/delete', (req: Request, res: Response) => {
    const { _eventId } = req.query

    const events = client.db().collection('events');

    console.log('eventid', _eventId)

    events.deleteOne({ 'id': Number(_eventId) })

    res.send('Event deleted')
  })
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
