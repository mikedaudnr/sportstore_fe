"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Package, Truck, CheckCircle, Clock, Eye, Download, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface OrderItem {
  id: number
  productId: number
  name: string
  image: string
  price: number
  quantity: number
  size?: string
  color?: string
}

interface Order {
  id: string
  orderNumber: string
  date: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  total: number
  items: OrderItem[]
  shippingAddress: {
    name: string
    street: string
    city: string
    state: string
    zipCode: string
  }
  trackingNumber?: string
  estimatedDelivery?: string
}

const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "SS-2024-001",
    date: "2024-01-15",
    status: "delivered",
    total: 299.98,
    items: [
      {
        id: 1,
        productId: 1,
        name: "Nike Air Max Running Shoes",
        image: "/placeholder.svg?height=80&width=80",
        price: 129.99,
        quantity: 1,
        size: "10",
        color: "Black",
      },
      {
        id: 2,
        productId: 2,
        name: "Under Armour Training Shirt",
        image: "/placeholder.svg?height=80&width=80",
        price: 49.99,
        quantity: 2,
        size: "L",
        color: "Blue",
      },
    ],
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
    },
    trackingNumber: "1Z999AA1234567890",
  },
  {
    id: "2",
    orderNumber: "SS-2024-002",
    date: "2024-01-20",
    status: "shipped",
    total: 159.99,
    items: [
      {
        id: 3,
        productId: 3,
        name: "Wilson Tennis Racket Pro",
        image: "/placeholder.svg?height=80&width=80",
        price: 159.99,
        quantity: 1,
      },
    ],
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
    },
    trackingNumber: "1Z999AA1234567891",
    estimatedDelivery: "2024-01-25",
  },
  {
    id: "3",
    orderNumber: "SS-2024-003",
    date: "2024-01-22",
    status: "processing",
    total: 79.99,
    items: [
      {
        id: 4,
        productId: 4,
        name: "Adidas Football Jersey",
        image: "/placeholder.svg?height=80&width=80",
        price: 79.99,
        quantity: 1,
        size: "M",
        color: "Red",
      },
    ],
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
    },
  },
]

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  useEffect(() => {
    filterOrders()
  }, [orders, searchQuery, statusFilter])

  const fetchOrders = async () => {
    try {
      // Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate loading
      setOrders(mockOrders)
    } catch (error) {
      console.error("Failed to fetch orders:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterOrders = () => {
    let filtered = orders

    if (searchQuery) {
      filtered = filtered.filter(
        (order) =>
          order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter)
    }

    setFilteredOrders(filtered)
  }

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "processing":
        return <RefreshCw className="h-4 w-4" />
      case "shipped":
        return <Truck className="h-4 w-4" />
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      case "cancelled":
        return <Package className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const OrderCard = ({ order }: { order: Order }) => (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{order.orderNumber}</CardTitle>
            <CardDescription>Ordered on {new Date(order.date).toLocaleDateString()}</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(order.status)}>
              {getStatusIcon(order.status)}
              <span className="ml-1 capitalize">{order.status}</span>
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* Order Items */}
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <div className="text-sm text-muted-foreground">
                    {item.size && <span>Size: {item.size}</span>}
                    {item.color && <span className="ml-2">Color: {item.color}</span>}
                    <span className="ml-2">Qty: {item.quantity}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">${item.price}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="space-y-1">
              {order.trackingNumber && (
                <p className="text-sm text-muted-foreground">
                  Tracking: <span className="font-mono">{order.trackingNumber}</span>
                </p>
              )}
              {order.estimatedDelivery && (
                <p className="text-sm text-muted-foreground">
                  Estimated delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                </p>
              )}
            </div>
            <div className="text-right">
              <div className="text-lg font-bold">${order.total}</div>
              <div className="flex space-x-2 mt-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/orders/${order.id}`}>
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Link>
                </Button>
                {order.status === "shipped" && (
                  <Button variant="outline" size="sm">
                    <Truck className="h-4 w-4 mr-1" />
                    Track Order
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Invoice
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="h-8 w-8 animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Orders</h1>
        <p className="text-muted-foreground">Track and manage your orders</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Search orders or products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All ({orders.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({orders.filter((o) => o.status === "pending").length})</TabsTrigger>
          <TabsTrigger value="processing">
            Processing ({orders.filter((o) => o.status === "processing").length})
          </TabsTrigger>
          <TabsTrigger value="shipped">Shipped ({orders.filter((o) => o.status === "shipped").length})</TabsTrigger>
          <TabsTrigger value="delivered">
            Delivered ({orders.filter((o) => o.status === "delivered").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {filteredOrders.length > 0 ? (
            <div>
              {filteredOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No orders found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery || statusFilter !== "all"
                    ? "Try adjusting your search or filters"
                    : "You haven't placed any orders yet"}
                </p>
                <Button asChild>
                  <Link href="/products">Start Shopping</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {["pending", "processing", "shipped", "delivered"].map((status) => (
          <TabsContent key={status} value={status}>
            {orders.filter((order) => order.status === status).length > 0 ? (
              <div>
                {orders
                  .filter((order) => order.status === status)
                  .map((order) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No {status} orders</h3>
                  <p className="text-muted-foreground">You don't have any {status} orders at the moment.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
