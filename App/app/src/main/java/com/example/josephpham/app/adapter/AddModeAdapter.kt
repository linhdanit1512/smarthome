package com.example.josephpham.app.adapter

import android.content.Context
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.CheckBox
import android.widget.TextView
import com.example.josephpham.app.R
import com.example.josephpham.app.activity.Main2Activity
import com.example.josephpham.app.activity.MainActivity
import com.example.josephpham.app.model.DeviceInRoom
import com.squareup.picasso.Picasso
import de.hdodenhof.circleimageview.CircleImageView
import kotlinx.android.synthetic.main.item_device_land.view.*


class AddModeAdapter : RecyclerView.Adapter<AddModeAdapter.ViewHolder>{
    var listAllDevice = Main2Activity.listAllDevice
    var context: Context? = null

    constructor(context: Context) {
        this.context = context
    }
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(context).inflate(R.layout.item_device_land, parent, false)
        return  ViewHolder(view)
    }

    override fun getItemCount(): Int {
        return listAllDevice!!.size
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.checkbox.setOnCheckedChangeListener(null);
        holder.checkbox.setOnCheckedChangeListener {
            buttonView, isChecked -> listAllDevice!!.get(holder.adapterPosition).setSelected(isChecked) }
        Picasso.get().load(listAllDevice!!.get(position).device!!.img).into(holder.imgdevice)
//        holder..setImageResource()
        holder.tvdevice.setText(listAllDevice!!.get(position).device_name)
    }

    inner class ViewHolder(mView: View) : RecyclerView.ViewHolder(mView) {
        val imgdevice: CircleImageView = mView.imgdevice
        val tvdevice: TextView = mView.tvdeivce
        val checkbox : CheckBox = mView.checkbox
    }
}