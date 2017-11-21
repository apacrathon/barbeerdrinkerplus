#include <ctime>
#include <fstream>
#include <iostream>
#include <vector>
#include <string>
#include <ctime>

using namespace std;

int main() 
{
 srand(time(NULL));
int randnum1;
int j = 0;
ofstream myfile;
myfile.open("cap.txt");
for(int i=0; i<4400; i++)
{ 
randnum1 = rand() % 250 + 151;
if (j == 115)
break;
else if (randnum1 % 5 == 0)
{
	cout << randnum1 << endl;
	myfile << randnum1 << endl;
	j++;
}

}
system("PAUSE");
return 0;

}

