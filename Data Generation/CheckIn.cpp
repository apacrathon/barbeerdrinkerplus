#include <fstream>
#include <iostream>
#include <vector>
#include <string>
#include <ctime>
#include <sstream>
using namespace std;

int main() {
	srand(time(NULL));
	string UID,name, name2,UID2;
	int freqBarid;
	vector<string>freqUID;
	vector<string>freqname;
	vector<int>freqUID2;
	vector<string>freqname2;


	ifstream why("frequents.csv");
	while (why.good())
	{
		getline(why, UID, ',');
		getline(why, name, ',');
		getline(why, UID2, ',');
		istringstream ss(UID2);
		ss >> freqBarid;
		getline(why, name2, '\n');
		freqUID.push_back(UID);
		freqname.push_back(name);
		freqUID2.push_back(freqBarid);
		freqname2.push_back(name2);
	}
	why.close();
	vector<string> Monday;
	vector<string> Tuesday;
	vector<string> Wed;
	vector<string> Thur;
	vector<string> Fri;
	vector<string> Sat;
	vector<string> Sun;
	string mon, tues, wed, thurs, fri, sun, sat;

	ifstream file("RandomDays.csv");
	while (file.good())
	{
		getline(file, sun, ',');
		getline(file, mon, ',');
		getline(file, tues, ',');
		getline(file, wed, ',');
		getline(file, thurs, ',');
		getline(file, fri, ',');
		getline(file, sat, '\n');
		Sun.push_back(sun);
		Monday.push_back(mon);
		Tuesday.push_back(tues);
		Wed.push_back(wed);
		Thur.push_back(thurs);
		Fri.push_back(fri);
		Sat.push_back(sat);
	}
	file.close();

	vector<int> Times_barID;
	vector<int> Times_open;
	vector<int> Times_close;

	int barid_time;
	int open_time;
	int close_time;
	string fakeopen, fakeclose, fakebarid, blank;

	ifstream file1("BarTimes.csv");

	while(file1.good())
	{
		getline(file1, fakebarid, ',');
		stringstream sss(fakebarid);
		sss >> barid_time;
		getline(file1, blank, ',');
		getline(file1, blank, ',');
		getline(file1, blank, ',');
		getline(file1, blank, ',');
		getline(file1, blank, ',');
		getline(file1, fakeopen, ',');
		stringstream ssss(fakeopen);
		ssss >> open_time;
		getline(file1, fakeclose,'\n');
		stringstream sssss(fakeclose);
		sssss >> close_time;
		
		Times_barID.push_back(barid_time);
		Times_open.push_back(open_time);
		Times_close.push_back(close_time);
	}
	file1.close();
	int size = freqUID.size();
	int r1 = .05*size; //sunday
	int r2 = .10*size;
	int r3 = .05*size;
	int r4 = .05*size;
	int r5 = .20*size;
	int r6 = .3*size;
	int r7 = .25*size;//saturday
	ofstream myfile;
	myfile.open("Checkin.txt");
	for (int i = 1; i < size; i++)
	{
		myfile << freqUID2[i] << "," << freqname2[i] << freqUID[i] << "," << freqname[i]<<",";

		if (i < r1)//sunday
		{
			myfile<<Sun[rand() % 150 + 1]<<" ";

			for (int j = 1; j < Times_barID.size()-1; j++)
			{
				if (freqUID2[i] == Times_barID[j])
				{
					if (Times_close[j] <= 7)
					{
						myfile << Times_close[j] + 24 - (rand() % 2 + 5) << ":00" << endl;;
					}
					else
					{
						myfile << Times_close[j] - (rand() % 2 + 5) << ":00" << endl;;
					}
				}
			}
		}
		else
		{
			//myfile << Sun[rand() % 150 + 1] << " " << "20:00" << endl;
		}
		if (i >= r1 && i < r1 + r2)//Monday
		{
			myfile << Monday[rand() % 150 + 1]<<" ";

			for (int j = 1; j < Times_barID.size()-1; j++)
			{
				if (freqUID2[i] == Times_barID[j])
				{
					if (Times_close[j] <= 7)
					{
						myfile << Times_close[j] + 24 - (rand() % 2 + 5) << ":00" << endl;;
					}
					else
					{
						myfile << Times_close[j] - (rand() % 2 + 5) << ":00" << endl;;
					}
				}
			}

		}
		else
		{
			//myfile << Monday[rand() % 150 + 1] << " " << "20:00" << endl;
		}

		if (i >= (r1 + r2) && i < (r1 + r2 + r3))//tuesday
		{
			myfile << Tuesday[rand() % 150 + 1]<<" ";

			for (int j = 1; j < Times_barID.size()-1; j++)
			{
				if (freqUID2[i] == Times_barID[j])
				{
					if (Times_close[j] <= 7)
					{
						myfile << Times_close[j] + 24 - (rand() % 2 + 5) << ":00" << endl;;
					}
					else
					{
						myfile << Times_close[j] - (rand() % 2 + 5) << ":00" << endl;;
					}
				}
			}

		}
		else
		{
			//myfile << Tuesday[rand() % 150 + 1] << " " << "20:00" << endl;

		}
		if (i >= (r1 + r2 + r3) && i < (r1 + r2 + r3 + r4))//wed
		{
			myfile << Wed[rand() % 150 + 1]<<" ";

			for (int j = 1; j < Times_barID.size()-1; j++)
			{
				if (freqUID2[i] == Times_barID[j])
				{
					if (Times_close[j] <= 7)
					{
						myfile << Times_close[j] + 24 - (rand() % 2 + 5) << ":00" << endl;;
					}
					else
					{
						myfile << Times_close[j] - (rand() % 2 + 5) << ":00" << endl;;
					}
				}
			}

		}
		else
		{
			//myfile << Wed[rand() % 150 + 1] << " " << "20:00" << endl;

		}
		if (i >= (r1 + r2 + r3 + r4) && i < (r1 + r2 + r3 + r4 + r5)) // thurs
		{
			myfile << Thur[rand() % 150 + 1]<<" ";

			for (int j = 1; j < Times_barID.size()-1; j++)
			{
				if (freqUID2[i] == Times_barID[j])
				{
					if (Times_close[j] <= 4)
					{
						myfile << Times_close[j] + 24 - (rand() % 4 + 1) << ":00" << endl;;
					}
					else
					{
						myfile << Times_close[j] - (rand() % 4 + 1) << ":00" << endl;;
					}
				}
			}

		}
		else
		{
			//myfile << Thur[rand() % 150 + 1] << " " << "20:00" << endl;

		}
		if (i >= (r1 + r2 + r3 + r4 + r5) && i < (r1 + r2 + r3 + r4 + r5 + r6))//fri
		{
			myfile << Fri[rand() % 150 + 1]<<" ";

			for (int j = 1; j < Times_barID.size()-1; j++)
			{
				if (freqUID2[i] == Times_barID[j])
				{
					if (Times_close[j] <= 4)
					{
						myfile << Times_close[j] + 24 - (rand() % 4 + 1) << ":00" << endl;;
					}
					else
					{
						myfile << Times_close[j] - (rand() % 4 + 1) << ":00" << endl;;
					}
				}
			}
		}
		else
		{
			//myfile << Fri[rand() % 150 + 1] << " " << "20:00" << endl;;

		}
		if (i >= (r1 + r2 + r3 + r4 + r5 + r6) && i < (r1 + r2 + r3 + r4 + r5 + r6 + r7))//sat
		{
			myfile << Sat[rand() % 150 + 1]<<" ";

			for (int j = 1; j < Times_barID.size()-1; j++)
			{
				if (freqUID2[i] == Times_barID[j])
				{
					if (Times_close[j] <= 4)
					{
						myfile << Times_close[j] + 24 - (rand() % 4 + 1) << ":00" << endl;;
					}
					else
					{
						myfile << Times_close[j] - (rand() % 4 + 1) << ":00" << endl;;
					}
				}
			}

		}
		else
		{
			//myfile << Sat[rand() % 150 + 1] << " " << "20:00" << endl;;

		}
	}

	myfile.close();
	system("PAUSE");
}