import java.util.Random;
import java.util.ArrayList;

public class Nodes {

    Random rand = new Random();
    ArrayList<Integer> nextNodes = new ArrayList<Integer>();
    int node;

    public Nodes(int m, int n){
        node = m;
        nextNodes.add(n);
    }

    @Override
    public String toString(){
        String back = "Node :" + node + " with nextNode = ";
        for(int i = 0; i < nextNodes.size(); i++){
            back = back + ", " + nextNodes.get(i);
        }
        return back;
    }
}
