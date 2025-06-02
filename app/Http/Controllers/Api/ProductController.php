<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with(['category', 'brand', 'images'])
            ->active()
            ->inStock();

        // Search functionality
        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
        }

        // Category filter
        if ($request->has('category')) {
            $query->where('category_id', $request->category);
        }

        // Brand filter
        if ($request->has('brand')) {
            $query->where('brand_id', $request->brand);
        }

        // Price range filter
        if ($request->has('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }

        if ($request->has('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        // Sorting
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        $products = $query->paginate($request->get('per_page', 15));

        return ProductResource::collection($products);
    }

    public function show(Product $product)
    {
        $product->load(['category', 'brand', 'images', 'reviews.user']);
        return new ProductResource($product);
    }

    public function featured()
    {
        $products = Product::with(['category', 'brand', 'images'])
            ->featured()
            ->active()
            ->inStock()
            ->limit(8)
            ->get();

        return ProductResource::collection($products);
    }

    public function search(Request $request)
    {
        $request->validate([
            'q' => 'required|string|min:2'
        ]);

        $products = Product::with(['category', 'brand', 'images'])
            ->where('name', 'like', '%' . $request->q . '%')
            ->orWhere('description', 'like', '%' . $request->q . '%')
            ->orWhereHas('category', function ($query) use ($request) {
                $query->where('name', 'like', '%' . $request->q . '%');
            })
            ->orWhereHas('brand', function ($query) use ($request) {
                $query->where('name', 'like', '%' . $request->q . '%');
            })
            ->active()
            ->inStock()
            ->paginate(20);

        return ProductResource::collection($products);
    }
}
