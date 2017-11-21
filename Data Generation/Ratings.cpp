#include <fstream>
#include <iostream>
#include <vector>
#include <string>
#include <ctime>

using namespace std;

int main() {
	vector<string> drinkerID;
	vector<string> barvec;
	vector<string> barID;
	string name,UID,space;
	srand(time(NULL));
	//read bar names
	ifstream file("bar.csv");
	while (file.good())
	{
		getline(file, UID , ',');
		getline(file, name , ',');
		getline(file, space, '\n');
		barID.push_back(UID);
		barvec.push_back(name);

	}
	file.close();
	//read drinkers names
	ifstream drinkerfile("Drinkers.csv");
	while (drinkerfile.good())
	{
		getline(drinkerfile, UID, ',');
		getline(drinkerfile, name, ',');
		getline(drinkerfile, space, '\n');
		drinkerID.push_back(UID);

	}
	drinkerfile.close();
	
	//generate ratings and write into text file
	int range1 = 300; // 150-200 ratings 
	int range2 = 500; // 200-300 ratings
	int range3 = 600; // 40-50 ratings
	int range4 = 1000; // 400-1000 ratings
	int randnum;
	int year, month, day, hours, min, sec;
	ofstream myfile;
	myfile.open("ratings.txt");
	int randnum3; //random rating given by drinker
	int r1, r2, r3, r4, r5;
		for (int i = 0; i < 1000; i++) //for each bar
		{
			if (i < range1)
			{
				randnum = rand() % 50 + 150; // random amount of ratings for 0 - range1
				r1 = .1*randnum;
				r2 = .15*randnum;
				r3 = .25*randnum;
				r4 = .3*randnum;
				r5 = .2*randnum;
			}
			else if (i >= range1 && i < range2)
			{
				randnum = rand() % 100 + 200; // random amount of ratings for range1 - range2
				r1 = .1*randnum;
				r2 = .1*randnum;
				r3 = .25*randnum;
				r4 = .4*randnum;
				r5 = .15*randnum;
			}
			else if (i >= range2 && i < range3)
			{
				randnum = rand() % 10 + 40; // random amount of ratings for range2 - range3
				r1 = .1*randnum;
				r2 = .4*randnum;
				r3 = .2*randnum;
				r4 = .2*randnum;
				r5 = .1*randnum;
			}
			else if (i >= range3 && i < range4)
			{
				randnum = rand() % 600 + 400; // random amount of ratings for range3 - range4
				r1 = .05*randnum;
				r2 = .05*randnum;
				r3 = .1*randnum;
				r4 = .2*randnum;
				r5 = .6*randnum;
			}
			

			
			for (int j = 0; j < randnum; j++)
			{
				if (i < range1)
				{
					year = rand() % 4 + 2014;
					month = rand() % 12 + 1;
					day = rand() % 28 + 1;
					hours = rand() % 23;
					min = rand() % 59;
					sec = rand() % 59;
					if (j < r1)
						randnum3 = 1;
					else if (j >= (r1) && j < (r1 + r2))
						randnum3 = 2;
					else if (j >= (r1 + r2) && j < (r1 + r2 + r3))
						randnum3 = 3;
					else if (j >= (r1 + r2 + r3) && j < (r1 + r2 + r3 + r4))
						randnum3 = 4;
					else if (j >= (r1 + r2 + r3 + r4) && j < (r1 + r2 + r3 + r4 + r5))
						randnum3 = 5;
					else
						randnum3 = rand() % 5 + 1;
				}
				else if (i >= range1 && i < range2)
				{
					year = rand() % 5 + 2013;
					month = rand() % 12 + 1;
					day = rand() % 28 + 1;
					hours = rand() % 23;
					min = rand() % 59;
					sec = rand() % 59;
					if (j < r1)
						randnum3 = 1;
					else if (j >= (r1) && j < (r1 + r2))
						randnum3 = 2;
					else if (j >= (r1 + r2) && j < (r1 + r2 + r3))
						randnum3 = 3;
					else if (j >= (r1 + r2 + r3) && j < (r1 + r2 + r3 + r4))
						randnum3 = 4;
					else if (j >= (r1 + r2 + r3 + r4) && j < (r1 + r2 + r3 + r4 + r5))
						randnum3 = 5;
					else
						randnum3 = rand() % 5 + 1;
				}
				else if (i >= range2 && i < range3)
				{
					year = 2017;
					month = rand() % 12 + 1;
					day = rand() % 28 + 1;
					hours = rand() % 23;
					min = rand() % 59;
					sec = rand() % 59;
					if (j < r1)
						randnum3 = 1;
					else if (j >= (r1) && j < (r1 + r2))
						randnum3 = 2;
					else if (j >= (r1 + r2) && j < (r1 + r2 + r3))
						randnum3 = 3;
					else if (j >= (r1 + r2 + r3) && j < (r1 + r2 + r3 + r4))
						randnum3 = 4;
					else if (j >= (r1 + r2 + r3 + r4) && j < (r1 + r2 + r3 + r4 + r5))
						randnum3 = 5;
					else
						randnum3 = rand() % 5 + 1;
				}
				else if (i >= range3 && i < range4)
				{
					year = rand() % 6 + 2012;
					month = rand() % 12 + 1;
					day = rand() % 28 + 1;
					hours = rand() % 23;
					min = rand() % 59;
					sec = rand() % 59;
					if (j < r1)
						randnum3 = 1;
					else if (j >= (r1) && j < (r1 + r2))
						randnum3 = 2;
					else if (j >= (r1 + r2) && j < (r1 + r2 + r3))
						randnum3 = 3;
					else if (j >= (r1 + r2 + r3) && j < (r1 + r2 + r3 + r4))
						randnum3 = 4;
					else if (j >= (r1 + r2 + r3 + r4) && j < (r1 + r2 + r3 + r4 + r5))
						randnum3 = 5;
					else
						randnum3 = rand() % 5 + 1;
					
				}
				int randnum2 = rand() % 10000 + 1; // select random drinker name
				
				//cout << barID[i + 1] << "," << barvec[i + 1] << "," << drinkerID[randnum2] << "," << year << "-";
				myfile << barID[i + 1] << "," << barvec[i + 1] << "," << drinkerID[randnum2] << "," << year << "-";
				if (month < 10)
				{
					//cout << "0" << month;
					myfile << "0" << month;
				}
				else
				{
					//cout << month;
					myfile << month;
				}

				////cout << "-";
				myfile << "-";
				if (day < 10)
				{
					////cout << "0" << day;
					myfile << "0" << day;
				}
				else 
				{
					//cout << day;
					myfile << day;
				}

				//cout << " ";
				myfile << " ";
				if (hours < 10)
				{
					//cout << "0" << hours;
					myfile<< "0" << hours;
				}
				else
				{
					//cout << hours;
					myfile << hours;
				}
				//cout << ":";
				myfile << ":";
				if (min < 10)
				{
					//cout << "0" << min;
					myfile << "0" << min;
				}
				else
				{
					//cout << min;
					myfile << min;
				}
				//cout << ":";
				myfile << ":";
				if (sec < 10)
				{
					//cout << "0" << sec;
					myfile << "0" << sec;
				}
				else
				{
					//cout << sec;
					myfile << sec;
				}
				//cout << "," << randnum3 << endl; 
				myfile << "," << randnum3 << endl;
				
			}
		}
	
	myfile.close();
	system("PAUSE");
}