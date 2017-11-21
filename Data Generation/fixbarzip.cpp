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
	ofstream myfile;
	myfile.open("fixzip.txt");
	for (int i = 0; i < 1000; i++)
	{
		if (barzip[i + 1].length() < 5)
		{
			cout << "0" << barzip[i + 1] << endl;
			myfile << "0" << barzip[i + 1] << endl;
		}
		else {
			cout << barzip[i + 1] << endl;
			myfile <<  barzip[i + 1] << endl;
		}
	}
	myfile.close();
	system("PAUSE");
}