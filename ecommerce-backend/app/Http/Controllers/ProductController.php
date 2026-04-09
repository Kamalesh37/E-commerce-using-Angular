<?php
 
namespace App\Http\Controllers;
 
use App\Models\Product;
use Illuminate\Http\JsonResponse;
 
class ProductController extends Controller
{
    // GET /api/products  — all categories
    public function index(): JsonResponse
    {
        $products = Product::all();
        return response()->json($this->formatProducts($products));
    }
 
    // GET /api/laptops
    public function laptops(): JsonResponse
    {
        $products = Product::where('category', 'laptop')->get();
        return response()->json($this->formatProducts($products));
    }
 
    // GET /api/mobiles
    public function mobiles(): JsonResponse
    {
        $products = Product::where('category', 'mobile')->get();
        return response()->json($this->formatProducts($products));
    }
 
    // GET /api/televisions
    public function televisions(): JsonResponse
    {
        $products = Product::where('category', 'television')->get();
        return response()->json($this->formatProducts($products));
    }
 
    // GET /api/products/{id}
    public function show($id): JsonResponse
    {
        $product = Product::findOrFail($id);
        
        // Return a single nicely formatted object
        return response()->json([
            'id'          => $product->id,
            'name'        => $product->name,
            'brand'       => $product->brand,
            'shortDes'    => $product->short_des,
            'price'       => $product->price,
            'actualPrice' => $product->actual_price,
            'discount'    => $product->discount,
            'image'       => $product->image,
            'category'    => $product->category,
        ]);
    }

    // Map DB snake_case → Angular camelCase expected by the frontend
    private function formatProducts($products): array
    {
        return $products->map(fn($p) => [
            'id'          => $p->id,
            'name'        => $p->name,
            'brand'       => $p->brand,
            'shortDes'    => $p->short_des,
            'price'       => $p->price,
            'actualPrice' => $p->actual_price,
            'discount'    => $p->discount,
            'image'       => $p->image,
        ])->toArray();
    }
}