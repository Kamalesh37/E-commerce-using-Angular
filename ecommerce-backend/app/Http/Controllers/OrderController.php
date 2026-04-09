<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Orders;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class OrderController extends Controller
{
    // GET /api/user/orders
    public function index(): JsonResponse
    {
        $orders = Orders::where('user_id', auth()->id())->with('product')->orderBy('created_at', 'desc')->get();
        return response()->json([
            'success' => true,
            'orders'  => $orders
        ]);
    }

    // POST /api/orders
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'customer_name'  => 'required|string|max:255',
            'customer_email' => 'required|email',
            'product_id'     => 'required|exists:products,id',
            'quantity'       => 'required|integer|min:1',
            'total_price'    => 'required|numeric|min:0',
        ]);

        $orderData = array_merge($validated, ['status' => 'pending']);
        
        if (auth()->check()) {
            $orderData['user_id'] = auth()->id();
        }

        $order = Orders::create($orderData);

        return response()->json([
            'success' => true,
            'order'   => $order,
        ], 201);
    }
}