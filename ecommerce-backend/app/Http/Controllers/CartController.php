<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CartController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $items = CartItem::where('user_id', $request->user()->id)->get();
        return response()->json($items);
    }

    public function sync(Request $request): JsonResponse
    {
        $localItems = $request->input('items', []);
        $userId = $request->user()->id;

        foreach ($localItems as $item) {
            $existing = CartItem::where('user_id', $userId)
                                ->where('name', $item['name'])
                                ->first();
            if ($existing) {
                // Keep the larger quantity or sum them up. Let's sum.
                $existing->quantity += $item['quantity'] ?? 1;
                $existing->save();
            } else {
                CartItem::create([
                    'user_id' => $userId,
                    'product_id' => $item['productId'] ?? null,
                    'name' => $item['name'],
                    'price' => $item['price'],
                    'quantity' => $item['quantity'] ?? 1,
                    'image' => $item['image'] ?? null,
                ]);
            }
        }

        return $this->index($request);
    }

    public function store(Request $request): JsonResponse
    {
        $userId = $request->user()->id;
        $name = $request->input('name');

        $existing = CartItem::where('user_id', $userId)->where('name', $name)->first();

        if ($existing) {
            $existing->quantity += $request->input('quantity', 1);
            $existing->save();
        } else {
            CartItem::create([
                'user_id' => $userId,
                'product_id' => $request->input('productId'),
                'name' => $name,
                'price' => $request->input('price'),
                'quantity' => $request->input('quantity', 1),
                'image' => $request->input('image'),
            ]);
        }
        
        return $this->index($request);
    }

    public function updateQuantity(Request $request, $id): JsonResponse
    {
        $userId = $request->user()->id;
        $diff = $request->input('diff', 0);

        // Find by native CartItem ID or name if ID isn't available
        $item = CartItem::where('user_id', $userId)->find($id);

        if ($item) {
            $item->quantity += $diff;
            if ($item->quantity <= 0) {
                $item->delete();
            } else {
                $item->save();
            }
        }
        return $this->index($request);
    }

    public function destroy(Request $request, $id): JsonResponse
    {
        CartItem::where('user_id', $request->user()->id)->where('id', $id)->delete();
        return $this->index($request);
    }

    public function clear(Request $request): JsonResponse
    {
        CartItem::where('user_id', $request->user()->id)->delete();
        return response()->json(['message' => 'Cart cleared']);
    }
}
