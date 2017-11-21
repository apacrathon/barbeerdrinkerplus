#include <fstream>
#include <iostream>
#include <vector>
#include <string>
#include <ctime>
#include <sstream>
using namespace std;

int main() {
	vector<string> barID;
	vector<string> Monday;
	vector<string> Tuesday;
	vector<string> Wed;
	vector<string> Thur;
	vector<string> Fri;
	vector<int> Start;
	vector<int> End;


	string UID, mon, tues, wed, thurs, fri, start, end;
	int start_time;
	int end_time;
	srand(time(NULL));
	//read bar names
	ifstream file("Happy Hour.csv");
	while (file.good())
	{
		getline(file, UID, ',');
		getline(file, mon, ',');
		getline(file, tues, ',');
		getline(file, wed, ',');
		getline(file, thurs, ',');
		getline(file, fri, ',');
		getline(file, start, ',');
		istringstream ss(start);
		ss >> start_time;

		getline(file, end, '\n');
		istringstream sss(end);
		sss >> end_time;
		barID.push_back(UID);
		Monday.push_back(mon);
		Tuesday.push_back(tues);
		Wed.push_back(wed);
		Thur.push_back(thurs);
		Fri.push_back(fri);
		Start.push_back(start_time);
		End.push_back(end_time);

	}
	file.close();
	ofstream myfile;
	myfile.open("baropen.txt");

	vector<int> BarOpen;
	vector<int> BarClose;
	for (int i = 1; i < Start.size()-1; i++)
	{
		BarOpen.push_back(Start[i] - (rand() % 3 + 1));
		BarClose.push_back((End[i] + (rand() % 3 + 5))%24);
	}
	string one = "1";
	for (int i = 0; i < BarOpen.size(); i++)
	{	

		cout << barID[i + 1] << ",";
		myfile << barID[i + 1] << ",";

		cout << rand() % 2; //sunday
		myfile << rand() % 2;
		if (!one.compare(Monday[i+1]))
		{
			cout << "1";
			myfile << "1";
		}
		else
		{
			cout << rand() % 2;
			myfile << rand() % 2;
		}
		if (!one.compare(Tuesday[i + 1]))
		{
			cout << "1";
			myfile << "1";
		}
		else
		{
			cout << rand() % 2;
			myfile << rand() % 2;
		}
		if (!one.compare(Wed[i + 1]))
		{
			cout << "1";
			myfile << "1";
		}
		else
		{
			cout << rand() % 2;
			myfile << rand() % 2;
		}
		if (!one.compare(Thur[i + 1]))
		{
			cout << "1";
			myfile << "1";
		}
		else
		{
			cout << rand() % 2;
			myfile << rand() % 2;
		}
		if (!one.compare(Fri[i + 1]))
		{
			cout << "1";
			myfile << "1";
		}
		else
		{
			cout << rand() % 2;
			myfile << rand() % 2;
		}
		cout << rand() % 2 << ",";//Saturday
		myfile << rand() % 2 << ",";
		
		
		if (BarOpen[i] < 10)
		{
			cout << "0";
			myfile << "0";
		}
		cout << BarOpen[i] << ":00" << ",";

		myfile << BarOpen[i] << ":00" << ",";
		if (BarClose[i] < 10)
		{
			cout << "0";
			myfile << "0";
		}
		cout << BarClose[i] << ":00" << endl;
		myfile << BarClose[i] << ":00" << endl;
	}
	myfile.close();
	system("PAUSE");
}