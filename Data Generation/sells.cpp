#include <fstream>
#include <iostream>
#include <vector>
#include <string>
#include <ctime>

using namespace std;

int main() {
	vector<string> drinkID;
	vector<string> drinkname;
	vector<string> barname;
	vector<string> barID;
	string name, UID, space;
	srand(time(NULL));
	//read bar names
	ifstream file("bar.csv");
	while (file.good())
	{
		getline(file, UID, ',');
		getline(file, name, ',');
		getline(file, space, '\n');
		barID.push_back(UID);
		barname.push_back(name);

	}
	file.close();
	//read drinkers names
	ifstream drinks("drinks list.csv");
	while (drinks.good())
	{
		getline(drinks, UID, ',');
		getline(drinks, name, ',');
		getline(drinks, space, '\n');
		drinkID.push_back(UID);
		drinkname.push_back(name);

	}
	drinks.close();
	int randnum1;
	int temp=-1;
	int randnum2;
	double happyprice;
	double happypercent;
	double price;
	ofstream myfile;
	myfile.open("sells.txt");
	for (int i = 0; i <1000 ; i++)
	{
		randnum1 = rand() % 10 + 15;
		happypercent = rand() % 5 + 1;
		happypercent = happypercent * 10;
		for (int j = 0; j <= randnum1; j++)
		{

			randnum2 = rand() % 200;
			while (temp == randnum2) 
			{
				randnum2 = rand() % 200;
			}
		
			temp = randnum2;
			price = rand() % 6 + 5;
			happyprice = price*(1-(happypercent /100));
			//cout << barID[i + 1] << "," << barname[i + 1] << "," << drinkname[randnum2 + 1]<<","<<price<<","<<happyprice << endl;
			myfile << barID[i + 1] << "," << barname[i + 1] << "," << drinkname[randnum2 + 1]<<","<<price<<","<<happyprice << endl;

		}
		
	}
	myfile.close();
	system("PAUSE");
}