import java.awt.*;
import java.awt.event.*;
import java.util.ArrayList;
import java.util.Random;
import javax.swing.*;

public class Board2 extends JPanel {
    // Global constants
    private static final int MAP_SIZE = 50;          // Grid size (50x50 cells)
    private static final int N_ITERATIONS = 4;       // Depth of recursion/splitting
    private static final boolean DISCARD_BY_RATIO = true; // Discard splits with extreme ratios
    private static final double H_RATIO = 0.45;        // Minimum acceptable height ratio (horizontal splits)
    private static final double W_RATIO = 0.45;        // Minimum acceptable width ratio (vertical splits)
    private static final int CANVAS_SIZE = 500;        // Canvas size in pixels (square canvas)
    private static final int SQUARE = CANVAS_SIZE / MAP_SIZE; // Pixel size of one grid cell
    
    private static Random randomGenerator = new Random();
    
    // --- Data Classes ---
    
    // Container represents a rectangular area defined in grid units.
    public static class Container {
        int x, y, w, h;
        Point center;
        
        public Container(int x, int y, int w, int h) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            // Compute center in grid coordinates.
            this.center = new Point(x + w / 2, y + h / 2);
        }
        
        // Draw the container boundaries on the given Graphics2D object.
        public void draw(Graphics2D g) {
            g.setColor(Color.GREEN);
            // Each grid unit is scaled by SQUARE.
            g.drawRect(x * SQUARE, y * SQUARE, w * SQUARE, h * SQUARE);
        }
        
        // Draw a path (line) from this container's center to that of another container.
        public void drawPath(Graphics2D g, Container other) {
            g.setColor(Color.LIGHT_GRAY);
            g.setStroke(new BasicStroke(SQUARE));
            g.drawLine(center.x * SQUARE, center.y * SQUARE,
                       other.center.x * SQUARE, other.center.y * SQUARE);
        }
    }
    
    // Tree is the binary tree node that holds a container ("leaf") and its left/right children.
    public static class Tree {
        Container leaf;
        Tree left, right;
        
        public Tree(Container container) {
            this.leaf = container;
            this.left = null;
            this.right = null;
        }
        
        // Recursively gather all leaf containers (ones that are not subdivided)
        public ArrayList<Container> getLeafs() {
            ArrayList<Container> result = new ArrayList<>();
            if (left == null && right == null) {
                result.add(leaf);
            } else {
                if (left != null) result.addAll(left.getLeafs());
                if (right != null) result.addAll(right.getLeafs());
            }
            return result;
        }
        
        // Recursively draw this container and all its children.
        public void draw(Graphics2D g) {
            leaf.draw(g);
            if (left != null) left.draw(g);
            if (right != null) right.draw(g);
        }
    }
    
    // Room is generated inside a container. In this version, every room is a square.
    public static class Room {
        int x, y, w, h;
        
        public Room(Container container) {
            // Determine available width and height from the container.
            int availWidth = container.w;
            int availHeight = container.h;
            // Maximum possible square side is the minimum of the two.
            int maxSquare = Math.min(availWidth, availHeight);
            // Choose a random square size from half of maxSquare up to maxSquare.
            int minSide = Math.max(1, maxSquare / 2);
            int side = minSide + randomGenerator.nextInt(maxSquare - minSide + 1);
            // Choose a random offset so that the square room fits within the container.
            int offsetX = randomGenerator.nextInt(availWidth - side + 1);
            int offsetY = randomGenerator.nextInt(availHeight - side + 1);
            
            this.x = container.x + offsetX;
            this.y = container.y + offsetY;
            this.w = side;
            this.h = side;
        }
        
        // Draw the room as a filled gray square.
        public void draw(Graphics2D g) {
            g.setColor(Color.GRAY);
            g.fillRect(x * SQUARE, y * SQUARE, w * SQUARE, h * SQUARE);
        }
    }
    
    // --- Dungeon Generation Methods ---
    
    // Randomly split a container into two subcontainers (vertical or horizontal)
    private Container[] randomSplit(Container container) {
        Container r1, r2;
        if (randomGenerator.nextBoolean()) {
            // Vertical split: choose a random split point (at least 1 cell wide)
            int split = randomGenerator.nextInt(container.w) + 1;
            r1 = new Container(container.x, container.y, split, container.h);
            r2 = new Container(container.x + split, container.y, container.w - split, container.h);
            if (DISCARD_BY_RATIO) {
                double r1Ratio = (double) r1.w / r1.h;
                double r2Ratio = (double) r2.w / r2.h;
                if (r1Ratio < W_RATIO || r2Ratio < W_RATIO) {
                    return randomSplit(container);
                }
            }
        } else {
            // Horizontal split: choose a random split point.
            int split = randomGenerator.nextInt(container.h) + 1;
            r1 = new Container(container.x, container.y, container.w, split);
            r2 = new Container(container.x, container.y + split, container.w, container.h - split);
            if (DISCARD_BY_RATIO) {
                double r1Ratio = (double) r1.h / r1.w;
                double r2Ratio = (double) r2.h / r2.w;
                if (r1Ratio < H_RATIO || r2Ratio < H_RATIO) {
                    return randomSplit(container);
                }
            }
        }
        return new Container[] { r1, r2 };
    }
    
    // Recursively splits the given container using a binary space partition algorithm.
    private Tree splitContainer(Container container, int iter) {
        Tree tree = new Tree(container);
        if (iter != 0 && container.w > 1 && container.h > 1) {
            Container[] splits = randomSplit(container);
            tree.left = splitContainer(splits[0], iter - 1);
            tree.right = splitContainer(splits[1], iter - 1);
        }
        return tree;
    }
    
    // Instance variables to hold the generated container tree and rooms.
    private Tree containerTree;
    private ArrayList<Room> rooms;
    
    // Constructor: generates a dungeon and sets up a mouse listener to regenerate it on click.
    public Board2() {
        generateDungeon();
        // Clicking anywhere in the panel regenerates the dungeon.
        addMouseListener(new MouseAdapter() {
            @Override
            public void mouseClicked(MouseEvent e) {
                generateDungeon();
                repaint();
            }
        });
        setPreferredSize(new Dimension(CANVAS_SIZE, CANVAS_SIZE));
    }
    
    // Generate the dungeon: split the main container and create square rooms in the leaf containers.
    private void generateDungeon() {
        Container mainContainer = new Container(0, 0, MAP_SIZE, MAP_SIZE);
        containerTree = splitContainer(mainContainer, N_ITERATIONS);
        rooms = new ArrayList<>();
        for (Container c : containerTree.getLeafs()) {
            rooms.add(new Room(c));
        }
    }
    
    // --- Drawing Methods ---
    
    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);
        // Clear background.
        g.setColor(Color.BLACK);
        g.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        
        Graphics2D g2d = (Graphics2D) g;
        // Enable anti-aliasing for smoother lines.
        g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        
        // Draw grid (optional; helps visualize the layout)
        g2d.setColor(new Color(255, 255, 255, 100));
        g2d.setStroke(new BasicStroke(0.5f));
        for (int i = 0; i <= MAP_SIZE; i++) {
            int pos = i * SQUARE;
            g2d.drawLine(pos, 0, pos, CANVAS_SIZE);
            g2d.drawLine(0, pos, CANVAS_SIZE, pos);
        }
        
        // Draw container boundaries (the BSP splitting)
        containerTree.draw(g2d);
        
        // Recursively draw paths connecting sibling containers.
        drawPaths(g2d, containerTree);
        
        // Draw the square rooms.
        for (Room room : rooms) {
            room.draw(g2d);
        }
    }
    
    // Recursively traverse the tree and draw paths connecting sibling containers.
    private void drawPaths(Graphics2D g, Tree tree) {
        if (tree == null) return;
        if (tree.left != null && tree.right != null) {
            tree.left.leaf.drawPath(g, tree.right.leaf);
            drawPaths(g, tree.left);
            drawPaths(g, tree.right);
        }
    }
    
    // --- Main method to launch the application ---
    public static void main(String[] args) {
        JFrame frame = new JFrame("BSP Dungeon Generation with Square Rooms");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        Board2 panel = new Board2();
        frame.add(panel);
        frame.pack();
        frame.setLocationRelativeTo(null);
        frame.setVisible(true);
    }
}

