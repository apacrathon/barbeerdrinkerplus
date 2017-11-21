#include <fstream>
#include <iostream>
#include <vector>
#include <string>
#include <ctime>
#include <sstream>

using namespace std;

int main() {
	vector<string> drinkID;
	vector<string> drinkname;
	vector<string> Drinkername;
	vector<string> DrinkerID;
	vector<string> drinktype;
	string name, UID, space,line,type;
	vector<int> Drinkerage;
	int age;
	srand(time(NULL));
	//read bar names
	ifstream file("Drinkers.csv");
	while (file.good())
	{
		getline(file, UID, ',');
		getline(file, name, ',');
		getline(file, line, ',');
		istringstream ss(line);
		ss >> age;
		getline(file, space, '\n');
		DrinkerID.push_back(UID);
		Drinkername.push_back(name);
		Drinkerage.push_back(age);
	}
	file.close();
	//read drinkers names
	ifstream drinks("drinks list.csv");
	while (drinks.good())
	{
		getline(drinks, UID, ',');
		getline(drinks, name, ',');
		getline(drinks, type, '\n');
		drinkID.push_back(UID);
		drinkname.push_back(name);
		drinktype.push_back(type);

	}
	drinks.close();
	int randnumyoung,randnummid,randnumold;
	int r1, r2, r3;
	int x=0, y=0, z = 0;
	int randtype;
	int temp=0;
	int rand200;
	int rand200mid;
	int rand200old;
	int tempmid = 0, tempold = 0;
	int i;
	ofstream myfile;
	myfile.open("likes.txt");
	for (i = 1; i < DrinkerID.size(); i++)
	{
		//if drinkers are between 21-30
		if (Drinkerage[i] <= 30 && Drinkerage[i] >= 21)//21-30
		{
			randnumyoung = rand() % 5 + 25; //how many drinks each drinker should have
			r1 = rand() % 3 + 1;
			x = 0;
			for (int j = 0; j < randnumyoung; j++) //insert drinks per drinker
			{
				while (x != r1) //have young drinkers have minimum of 1 shot
				{
					randtype = rand() % 200 + 1; //find drink type thats a shot
					rand200 = rand() % 200 + 1;
					while (temp == randtype) //make sure shots dont repeat
					{
						randtype = rand() % 200 + 1;
					}
					if (drinktype[randtype] == "Shot")
					{
						//cout << DrinkerID[i] << "," << Drinkername[i] << "," << drinkname[randtype] << endl;
						myfile << DrinkerID[i] << "," << Drinkername[i] << "," << drinkname[randtype] << endl;
						x++;
					}
					temp = randtype;

				}
				while (temp == rand200)
				{
					rand200 = rand() % 200 + 1;

				}
				//cout << DrinkerID[i] << "," << Drinkername[i] << "," << drinkname[rand200] << endl;
				myfile << DrinkerID[i] << "," << Drinkername[i] << "," << drinkname[rand200] << endl;
				temp = rand200;
			}
		}
		else if (Drinkerage[i] > 30 && Drinkerage[i] <= 40)
		{
			randnummid = rand() % 5 + 7;
			for (int j = 0; j < randnummid; j++)
			{
				rand200mid = rand() % 200 + 1;
				while (tempmid == rand200mid)
				{
					rand200mid = rand() % 200 + 1;
				}
				//cout << DrinkerID[i] << "," << Drinkername[i] << "," << drinkname[rand200mid] << endl;
				myfile << DrinkerID[i] << "," << Drinkername[i] << "," << drinkname[rand200mid] << endl;
				tempmid = rand200mid;
			}
		}
		else if (Drinkerage[i] > 40 && Drinkerage[i] <= 65)
		{
			randnumold = rand() % 2 + 4;
			for (int j = 0; j < randnumold; j++)
			{
				rand200old = rand() % 200 + 1;
				while (tempold == rand200old)
				{
					rand200old = rand() % 200 + 1;
				}
				//cout << DrinkerID[i] << "," << Drinkername[i] << "," << drinkname[rand200] << endl;
				myfile << DrinkerID[i] << "," << Drinkername[i] << "," << drinkname[rand200old] << endl;
				tempold = rand200old;
			}
		}

			}
	myfile.close();
	system("PAUSE");
}