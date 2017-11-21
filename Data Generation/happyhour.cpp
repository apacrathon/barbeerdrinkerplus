#include <fstream>
#include <iostream>
#include <vector>
#include <string>
#include <ctime>

using namespace std;

int main() {
	vector<string> barname;
	vector<string> barID;
	vector<string> barstreet;
	vector<string> barcity;
	vector<string> barstate;
	vector<string> barzip;

	string name, UID, street, city, state, zip, space;
	srand(time(NULL));
	//read bar names
	ifstream file("bars.csv");
	while (file.good())
	{
		getline(file, UID, ',');
		getline(file, name, ',');
		getline(file, street, ',');
		getline(file, city, ',');
		getline(file, state, ',');
		getline(file, zip, ',');
		getline(file, space, '\n');
		barID.push_back(UID);
		barname.push_back(name);
		barzip.push_back(zip);

	}
	file.close();
	string day[5] = { "1","1","1","1","1" };
	int start;
	int end;
	int randnum;
	int randnum2;
		ofstream myfile;
	myfile.open("HappyHour.txt");
	ofstream myfile2;
	myfile2.open("happyhourdays.txt");
	for (int i = 0; i < 1000; i++)
	{
		/*randnum = rand() % 5;
		randnum2 = rand() % 5;
		vector<string> days;
		for (int j = 0; j <= randnum; j++)
		{
			if (randnum == 4)
			{
				days.push_back(day[j]);
			}
			else if (randnum == 3)
			{
				if (randnum2 % 2 == 0)
					days.push_back(day[j + 1]);
				else
					days.push_back(day[j]);
			}
			else if (randnum == 2)
			{
				if (randnum2 == 1 || randnum == 4)
					days.push_back(day[j + 2]);
				else
					days.push_back(day[j]);
			}
			else if (randnum == 1)
			{
				days.push_back(day[j + 3]);
			}
			else
				days.push_back(day[rand()%5]);
			
			if (j == randnum) {
				cout << days[j] << endl;
				myfile2 << days[j] << endl;
			}
			else
			{
				cout << days[j] << ",";
				myfile2 << days[j] << ",";
			}
		}*/
		start = rand() % 4 + 1;
		end = rand() % 5 + 5;
		myfile <<start+12 << ":00," << end+12<<":00" << endl;
	}
	myfile.close();
	myfile2.close();
	system("PAUSE");
}