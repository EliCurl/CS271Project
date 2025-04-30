import java.util.Random;
import java.util.ArrayList;

class Main{

    static int BOUND = 10;
    static Random rand = new Random();

    public static void Setup(ArrayList<Nodes> a){
        int run = rand.nextInt(BOUND)+3;
        for(int i = 0; i < run; i++){
            if(i == 0){
                Nodes node = new Nodes(0,1);
                a.add(node);
            }
            else{
                int num = rand.nextInt(BOUND)+1;
                Nodes node = new Nodes(i,num);
                a.add(node);
            }
        }
    }

    public static void main(String[] args){
        ArrayList<Nodes> nodes = new ArrayList<Nodes>();
    }
}