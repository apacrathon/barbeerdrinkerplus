#include <fstream>
#include <iostream>
#include <vector>
#include <string>
#include <ctime>
#include <sstream>

using namespace std;

int main()
{

	vector<string> Drinkername;
	vector<string> DrinkerID;
	vector<string> DrinkerState;
	string name, UID, gender,age,city,state,zip,blank;

	srand(time(NULL));
	//read bar names
	ifstream file("Drinkers.csv");
	while (file.good())
	{
		getline(file, UID, ',');
		getline(file, name, ',');
		getline(file, gender, ',');
		getline(file, age, ',');
		getline(file, city, ',');
		getline(file, state, ',');
		getline(file, zip, '\n');

		DrinkerID.push_back(UID);
		Drinkername.push_back(name);
		DrinkerState.push_back(state);
	}
	file.close();
	vector<string> FriendsID;
	vector<string> friends;
	double randnum = 0;
	int randnum2 = 0;
	ofstream myfile;
	myfile.open("Friends.txt");
	for (int i = 1; i < DrinkerID.size() - 1; i++)
	{
		randnum = rand() % 3 + 4;
		randnum = randnum / 10;
		for (int j = 1; j < DrinkerID.size() - 1; j++)
		{
			if (DrinkerState[i] == DrinkerState[j])
			{
				friends.push_back(Drinkername[j]);
				FriendsID.push_back(DrinkerID[j]);
			}
		}
		randnum2 = randnum*friends.size();

		for (int k = 0; k < randnum2; k++) 
		{	
			int randnum3 = rand() % (randnum2)+1;
			myfile << DrinkerID[i] << "," << Drinkername[i] << "," << FriendsID[randnum3] << "," << friends[randnum3] << endl;
		}
		friends.clear();
	}
	cout << friends.size() << endl;


	system("PAUSE");
}